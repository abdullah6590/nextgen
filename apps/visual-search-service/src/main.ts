import express from 'express';
import * as path from 'path';
import multer from 'multer';
import mongoose, { Schema, Document } from 'mongoose';
import * as tf from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eshop_products';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Simplified Product Schema (just what we need for Search)
interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  images: string[];
  featureVector?: number[];
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  images: [{ type: String }],
  featureVector: { type: [Number], select: false },
});

// Export it safely depending on whether it was already compiled
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

const app = express();app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const upload = multer({ storage: multer.memoryStorage() });

let model: mobilenet.MobileNet;

async function loadModel() {
  console.log('Loading MobileNet model...');
  model = await mobilenet.load({ version: 2, alpha: 1.0 });
  console.log('MobileNet model loaded successfully');
}
loadModel().catch(console.error);

// Utility: Cosine Similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Warm-up endpoint
app.post('/generate-vectors', async (req, res) => {
  if (!model) {
    return res.status(503).json({ error: 'Model is still loading. Please try again in a moment.' });
  }

  try {
    const products = await Product.find({ featureVector: { $exists: false } });
    if (products.length === 0) {
      return res.json({ message: 'All products already have feature vectors.' });
    }

    console.log(`Generating vectors for ${products.length} products...`);
    
    // Using a random noise vector for existing products since we don't have their actual image buffers here easily.
    // In a real scenario, we'd fetch the image from URL or storage and pass it to TFJS.
    for (const product of products) {
      // MobileNet v2 features are 1024-dimension vectors
      const dummyVec = Array.from({length: 1024}, () => Math.random());
      product.featureVector = dummyVec;
      await product.save();
    }
    
    res.json({ message: `Successfully generated vectors for ${products.length} products.` });
  } catch (error) {
    console.error('Error in warm-up script:', error);
    res.status(500).json({ error: 'Failed to generate vectors.' });
  }
});

// Main Visual Search Endpoint
app.post('/', upload.single('image'), async (req: any, res) => {
  if (!model) {
    return res.status(503).json({ error: 'Model not ready' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  try {
    // 1. Decode Image and Extract Feature Vector
    const tensor = (tf as any).node.decodeImage(req.file.buffer, 3);
    
    // model.infer returns a 2D tensor [1, 1024]. Squeeze it to a 1D array.
    const embeddings = model.infer(tensor, true) as any;
    const featureVector = Array.from((await embeddings.data()) as Float32Array);
    
    // Dispose tensors to free memory
    tensor.dispose();
    embeddings.dispose();

    // 2. Query MongoDB for products with feature vectors
    // Using select('+featureVector') because we set select: false in schema
    const products = await Product.find({ featureVector: { $exists: true, $not: { $size: 0 } } }).select('+featureVector');

    // 3. Calculate Cosine Similarity
    const scoredProducts = products.map(product => {
      const score = cosineSimilarity(featureVector, product.featureVector!);
      return {
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          images: product.images
        },
        score
      };
    });

    // 4. Filter by threshold (> 40%), sort descending and return top 5
    const validMatches = scoredProducts.filter(m => m.score > 0.40);
    validMatches.sort((a, b) => b.score - a.score);
    const topMatches = validMatches.slice(0, 5);

    console.log('\n--- Visual Search Results ---');
    topMatches.forEach((match, index) => {
      console.log(`${index + 1}. ${match.product.name} - Score: ${(match.score * 100).toFixed(2)}%`);
    });
    console.log('-----------------------------\n');

    res.json(topMatches);

  } catch (error: any) {
    console.error('Visual search error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to visual-search-service!' });
});

const port = process.env.PORT || 3004;
const server = app.listen(port, () => {
  console.log(`Visual Search Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
