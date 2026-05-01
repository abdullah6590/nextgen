const { Pool } = require('pg');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const POSTGRES_URI = 'postgresql://admin:password@localhost:5432/eshop_db';
const MONGO_URI = 'mongodb://localhost:27017/eshop_products';

const vendors = [
  { email: 'vendor1@example.com', password: 'password123', name: 'TechVault' },
  { email: 'vendor2@example.com', password: 'password123', name: 'UrbanGear' },
  { email: 'vendor3@example.com', password: 'password123', name: 'QuantumEdge' },
  { email: 'vendor4@example.com', password: 'password123', name: 'NeonWave' },
  { email: 'vendor5@example.com', password: 'password123', name: 'CyberForge' },
];

// Each vendor gets unique products with REAL downloadable images
// These are Unsplash images that MobileNet can reliably extract feature vectors from
const vendorProducts = [
  // --- Vendor 1: TechVault — Electronics & Audio ---
  [
    {
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res Audio support.',
      price: 349.99, stock: 45, category: 'Audio',
      tags: ['headphones', 'wireless', 'noise-cancelling', 'audio'],
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Mechanical Gaming Keyboard',
      description: 'RGB backlit mechanical keyboard with Cherry MX switches, macro keys, and aircraft-grade aluminum frame.',
      price: 179.99, stock: 120, category: 'Peripherals',
      tags: ['keyboard', 'gaming', 'mechanical', 'rgb'],
      images: ['https://images.unsplash.com/photo-1541140532154-b024d1b23fbe?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Ultra-Wide Curved Monitor 34"',
      description: '34-inch UWQHD curved display with 144Hz refresh rate, 1ms response time, and HDR600 certification.',
      price: 699.99, stock: 18, category: 'Monitors',
      tags: ['monitor', 'ultrawide', 'curved', 'gaming'],
      images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Wireless Earbuds Pro',
      description: 'True wireless earbuds with spatial audio, adaptive EQ, and MagSafe charging case.',
      price: 249.99, stock: 200, category: 'Audio',
      tags: ['earbuds', 'wireless', 'bluetooth', 'audio'],
      images: ['https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof portable speaker with 360-degree sound, 20-hour battery, and built-in power bank.',
      price: 129.99, stock: 75, category: 'Audio',
      tags: ['speaker', 'bluetooth', 'portable', 'waterproof'],
      images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=80']
    },
  ],
  // --- Vendor 2: UrbanGear — Fashion & Lifestyle ---
  [
    {
      name: 'Classic Leather Sneakers',
      description: 'Handcrafted premium leather sneakers with memory foam insole and durable rubber outsole.',
      price: 189.99, stock: 60, category: 'Footwear',
      tags: ['sneakers', 'leather', 'shoes', 'casual'],
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Running Performance Shoes',
      description: 'Lightweight running shoes with responsive cushioning, breathable mesh upper, and reflective details.',
      price: 159.99, stock: 85, category: 'Footwear',
      tags: ['running', 'shoes', 'athletic', 'sports'],
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Aviator Sunglasses',
      description: 'Titanium frame aviator sunglasses with polarized UV400 lenses and anti-glare coating.',
      price: 219.99, stock: 40, category: 'Accessories',
      tags: ['sunglasses', 'aviator', 'polarized', 'uv-protection'],
      images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Canvas Backpack',
      description: 'Vintage-style canvas backpack with padded laptop compartment, leather trim, and waterproof lining.',
      price: 89.99, stock: 150, category: 'Bags',
      tags: ['backpack', 'canvas', 'laptop', 'travel'],
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Minimalist Analog Watch',
      description: 'Japanese quartz movement with sapphire crystal, Italian leather strap, and 50m water resistance.',
      price: 299.99, stock: 30, category: 'Watches',
      tags: ['watch', 'analog', 'minimalist', 'leather'],
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=80']
    },
  ],
  // --- Vendor 3: QuantumEdge — Computers & Components ---
  [
    {
      name: 'Gaming Laptop 15.6"',
      description: 'High-performance gaming laptop with RTX 4070, 32GB RAM, 1TB NVMe SSD, and 165Hz QHD display.',
      price: 1899.99, stock: 12, category: 'Laptops',
      tags: ['laptop', 'gaming', 'rtx', 'high-performance'],
      images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Wireless Gaming Mouse',
      description: 'Ultra-lightweight wireless gaming mouse with 25K DPI sensor, 70-hour battery, and customizable buttons.',
      price: 79.99, stock: 200, category: 'Peripherals',
      tags: ['mouse', 'gaming', 'wireless', 'ergonomic'],
      images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'USB-C Docking Station',
      description: 'Thunderbolt 4 docking station with dual 4K display output, 96W charging, and 10Gbps data transfer.',
      price: 249.99, stock: 55, category: 'Accessories',
      tags: ['dock', 'usb-c', 'thunderbolt', 'hub'],
      images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Mechanical Numpad',
      description: 'Wireless mechanical numpad with hot-swappable switches, RGB lighting, and Bluetooth 5.0.',
      price: 59.99, stock: 90, category: 'Peripherals',
      tags: ['numpad', 'mechanical', 'wireless', 'compact'],
      images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Webcam 4K Pro',
      description: '4K webcam with auto-focus, built-in ring light, dual noise-cancelling microphones, and privacy shutter.',
      price: 149.99, stock: 65, category: 'Peripherals',
      tags: ['webcam', '4k', 'streaming', 'video-call'],
      images: ['https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&auto=format&fit=crop&q=80']
    },
  ],
  // --- Vendor 4: NeonWave — Smart Wearables & Gadgets ---
  [
    {
      name: 'Smartwatch Series X',
      description: 'Advanced smartwatch with AMOLED display, ECG monitoring, GPS, and 7-day battery life.',
      price: 399.99, stock: 35, category: 'Wearables',
      tags: ['smartwatch', 'fitness', 'health', 'gps'],
      images: ['https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Fitness Tracker Band',
      description: 'Slim fitness band with heart rate monitoring, sleep tracking, SpO2 sensor, and 14-day battery.',
      price: 49.99, stock: 300, category: 'Wearables',
      tags: ['fitness', 'tracker', 'health', 'band'],
      images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Wireless Charging Pad',
      description: 'Qi-certified 15W fast wireless charging pad with LED indicator and foreign object detection.',
      price: 39.99, stock: 180, category: 'Accessories',
      tags: ['charger', 'wireless', 'qi', 'fast-charging'],
      images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Smart Home Hub',
      description: 'Voice-controlled smart home hub with 7-inch display, Zigbee support, and multi-room audio.',
      price: 179.99, stock: 50, category: 'Smart Home',
      tags: ['smart-home', 'hub', 'voice-assistant', 'zigbee'],
      images: ['https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Noise-Cancelling Earbuds',
      description: 'In-ear noise-cancelling earbuds with transparency mode, wireless charging, and IPX5 water resistance.',
      price: 199.99, stock: 8, category: 'Audio',
      tags: ['earbuds', 'noise-cancelling', 'wireless', 'waterproof'],
      images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=80']
    },
  ],
  // --- Vendor 5: CyberForge — Photography & Creative ---
  [
    {
      name: 'Mirrorless Camera Body',
      description: 'Full-frame mirrorless camera with 45MP sensor, 8K video recording, and in-body image stabilization.',
      price: 2499.99, stock: 10, category: 'Cameras',
      tags: ['camera', 'mirrorless', 'full-frame', 'photography'],
      images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Camera Lens 50mm f/1.4',
      description: 'Professional 50mm prime lens with ultra-fast f/1.4 aperture, nano crystal coating, and silent autofocus.',
      price: 549.99, stock: 25, category: 'Lenses',
      tags: ['lens', '50mm', 'prime', 'photography'],
      images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Professional Tripod',
      description: 'Carbon fiber travel tripod with ball head, 360° panorama, and quick-release plate system.',
      price: 189.99, stock: 40, category: 'Accessories',
      tags: ['tripod', 'carbon-fiber', 'photography', 'video'],
      images: ['https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'LED Ring Light 18"',
      description: '18-inch bi-color LED ring light with adjustable color temperature, phone holder, and remote control.',
      price: 79.99, stock: 95, category: 'Lighting',
      tags: ['ring-light', 'led', 'photography', 'streaming'],
      images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop&q=80']
    },
    {
      name: 'Drone 4K Pro',
      description: 'Foldable 4K camera drone with 3-axis gimbal, 40-min flight time, obstacle avoidance, and GPS return.',
      price: 999.99, stock: 15, category: 'Drones',
      tags: ['drone', '4k', 'camera', 'aerial', 'gps'],
      images: ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&auto=format&fit=crop&q=80']
    },
  ],
];

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  vendorId: { type: String, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
  featureVector: { type: [Number], select: false },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function run() {
  const pool = new Pool({ connectionString: POSTGRES_URI });
  await mongoose.connect(MONGO_URI);

  console.log('✅ Connected to databases.\n');

  // Clear existing products for a clean slate
  const deleted = await Product.deleteMany({});
  console.log(`🗑  Cleared ${deleted.deletedCount} existing products.\n`);

  for (let i = 0; i < vendors.length; i++) {
    const v = vendors[i];
    const hashedPassword = await bcrypt.hash(v.password, 10);
    
    let res = await pool.query('SELECT id FROM "User" WHERE email = $1', [v.email]);
    let userId;
    if (res.rows.length === 0) {
      const insertRes = await pool.query(
        'INSERT INTO "User" (email, password, role, "emailVerified", "createdAt", "twoFactorEnabled") VALUES ($1, $2, $3, $4, NOW(), false) RETURNING id',
        [v.email, hashedPassword, 'vendor', true]
      );
      userId = insertRes.rows[0].id;
      console.log(`👤 Created vendor: ${v.name} (${v.email}) — ID: ${userId}`);
    } else {
      userId = res.rows[0].id;
      console.log(`👤 Existing vendor: ${v.name} (${v.email}) — ID: ${userId}`);
    }

    const products = vendorProducts[i];
    for (const p of products) {
      const prod = new Product({
        ...p,
        vendorId: userId.toString(),
      });
      await prod.save();
      console.log(`   📦 ${p.name} — $${p.price} — Stock: ${p.stock}`);
    }
    console.log(`   ✅ ${products.length} products created for ${v.name}\n`);
  }

  console.log('═══════════════════════════════════════════');
  console.log('🎉 Seeding complete! 25 products across 5 vendors.');
  console.log('═══════════════════════════════════════════');
  console.log('\nNext step: Generate feature vectors for visual search:');
  console.log('  curl -X POST http://localhost:3004/generate-vectors');
  console.log('');

  await pool.end();
  await mongoose.disconnect();
}

run().catch(console.error);
