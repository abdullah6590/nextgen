import express from 'express';
import * as path from 'path';
import multer from 'multer';
import mongoose, { Schema, Document } from 'mongoose';
import * as tf from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';
import axios from 'axios';

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

/**
 * Download an image from a URL and return the raw Buffer.
 * Handles HTTP/HTTPS URLs. Returns null on failure.
 */
async function downloadImage(imageUrl: string): Promise<Buffer | null> {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 15000, // 15 second timeout per image
      headers: {
        'User-Agent': 'NeuralCart-VisualSearch/1.0',
      },
    });
    return Buffer.from(response.data);
  } catch (error: any) {
    console.warn(`  ⚠ Failed to download image: ${imageUrl.substring(0, 80)}... (${error.message})`);
    return null;
  }
}

/**
 * Extract a 1024-dimension feature vector from an image buffer using MobileNet v2.
 * Returns null if extraction fails (corrupt image, wrong format, etc.).
 */
async function extractFeatureVector(imageBuffer: Buffer): Promise<number[] | null> {
  let tensor: any = null;
  let embeddings: any = null;

  try {
    // Decode the image to a 3-channel tensor (RGB)
    tensor = (tf as any).node.decodeImage(imageBuffer, 3);

    // model.infer with second arg `true` returns the penultimate layer embeddings [1, 1024]
    embeddings = model.infer(tensor, true) as any;
    const featureVector = Array.from((await embeddings.data()) as Float32Array);

    return featureVector;
  } catch (error: any) {
    console.warn(`  ⚠ Feature extraction failed: ${error.message}`);
    return null;
  } finally {
    // Always dispose tensors to prevent memory leaks
    if (tensor) tensor.dispose();
    if (embeddings) embeddings.dispose();
  }
}

// ──────────────────────────────────────────────────────────────────
// POST /generate-vectors — Real image extraction pipeline
// Downloads each product's first image, extracts MobileNet features,
// and stores the 1024-d vector in MongoDB.
// Query params:
//   ?force=true — re-generate vectors for ALL products (not just missing)
// ──────────────────────────────────────────────────────────────────
app.post('/generate-vectors', async (req, res) => {
  if (!model) {
    return res.status(503).json({ error: 'Model is still loading. Please try again in a moment.' });
  }

  const forceRegenerate = req.query.force === 'true';

  try {
    // Find products that need vector generation
    const query = forceRegenerate
      ? {} // All products
      : { $or: [
          { featureVector: { $exists: false } },
          { featureVector: { $size: 0 } },
        ]};

    const products = await Product.find(query).select('+featureVector');

    if (products.length === 0) {
      return res.json({
        message: 'All products already have feature vectors.',
        hint: 'Use ?force=true to regenerate all vectors.',
      });
    }

    console.log(`\n🧠 Generating real feature vectors for ${products.length} products...`);

    let success = 0;
    let skipped = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const product of products) {
      const imageUrl = product.images?.[0];
      if (!imageUrl) {
        console.log(`  ⏭ ${product.name}: No image URL — skipping`);
        skipped++;
        continue;
      }

      console.log(`  📷 Processing: ${product.name}...`);

      // Step 1: Download the image
      const imageBuffer = await downloadImage(imageUrl);
      if (!imageBuffer) {
        failed++;
        errors.push(`${product.name}: Download failed`);
        continue;
      }

      // Step 2: Extract feature vector using MobileNet
      const featureVector = await extractFeatureVector(imageBuffer);
      if (!featureVector) {
        failed++;
        errors.push(`${product.name}: Feature extraction failed`);
        continue;
      }

      // Step 3: Store the vector in MongoDB
      product.featureVector = featureVector;
      await product.save();
      success++;
      console.log(`  ✅ ${product.name}: Vector generated (${featureVector.length}d)`);
    }

    console.log(`\n📊 Vector generation complete: ${success} success, ${skipped} skipped, ${failed} failed\n`);

    res.json({
      message: `Feature vector generation complete.`,
      total: products.length,
      success,
      skipped,
      failed,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Error in vector generation:', error);
    res.status(500).json({ error: 'Failed to generate vectors.' });
  }
});

// ──────────────────────────────────────────────────────────────────
// POST /generate-vector/:id — Generate vector for a single product
// Called by product-service when a new product is created/updated.
// ──────────────────────────────────────────────────────────────────
app.post('/generate-vector/:id', async (req, res) => {
  if (!model) {
    return res.status(503).json({ error: 'Model is still loading.' });
  }

  try {
    const product = await Product.findById(req.params.id).select('+featureVector');
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const imageUrl = product.images?.[0];
    if (!imageUrl) {
      return res.status(400).json({ error: 'Product has no images.' });
    }

    console.log(`🧠 Generating vector for: ${product.name}...`);

    const imageBuffer = await downloadImage(imageUrl);
    if (!imageBuffer) {
      return res.status(422).json({ error: 'Failed to download product image.' });
    }

    const featureVector = await extractFeatureVector(imageBuffer);
    if (!featureVector) {
      return res.status(422).json({ error: 'Failed to extract features from image.' });
    }

    product.featureVector = featureVector;
    await product.save();

    console.log(`✅ ${product.name}: Vector generated (${featureVector.length}d)`);
    res.json({ message: 'Feature vector generated.', dimensions: featureVector.length });
  } catch (error: any) {
    console.error('Single vector generation error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// ──────────────────────────────────────────────────────────────────
// GET /status — Check service health, model status, and vector coverage
// ──────────────────────────────────────────────────────────────────
app.get('/status', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const withVectors = await Product.countDocuments({
      featureVector: { $exists: true, $not: { $size: 0 } },
    });

    res.json({
      service: 'visual-search-service',
      modelLoaded: !!model,
      modelVersion: 'MobileNet v2 (alpha 1.0)',
      vectorDimensions: 1024,
      products: {
        total: totalProducts,
        withVectors,
        coverage: totalProducts > 0 ? `${((withVectors / totalProducts) * 100).toFixed(1)}%` : '0%',
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get status.' });
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
    // 1. Extract feature vector from uploaded image
    const featureVector = await extractFeatureVector(req.file.buffer);
    if (!featureVector) {
      return res.status(422).json({ error: 'Failed to extract features from the uploaded image.' });
    }

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
