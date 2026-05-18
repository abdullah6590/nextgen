'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  vendorId: string;
  images: string[];
  tags: string[];
  createdAt: string;
}

const API_URL = 'http://localhost:8080';

export default function ProductDeepDive() {
  const params = useParams();
  const productId = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const dummyProducts = [
        { _id: "demo-1", name: "Quantum Neural Processor v9", price: 1499.99, category: "Components", stock: 15, vendorId: "v1", tags: ["Neural", "Quantum", "CPU"], images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80"], description: "Next-gen quantum neural processor for extreme computational workloads.", createdAt: new Date().toISOString() },
        { _id: "demo-2", name: "Cybernetic Visual Augmentation", price: 849.50, category: "Wearables", stock: 5, vendorId: "v1", tags: ["Cybernetic", "Vision"], images: ["https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=500&auto=format&fit=crop&q=80"], description: "Advanced optical implants with HUD integration.", createdAt: new Date().toISOString() },
        { _id: "demo-3", name: "Neon-Lit Mechanical Array", price: 229.99, category: "Peripherals", stock: 42, vendorId: "v1", tags: ["Keyboard", "RGB"], images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=80"], description: "Tactile mechanical keyboard with programmable neon matrix.", createdAt: new Date().toISOString() },
        { _id: "demo-4", name: "Holographic Matrix Projector", price: 2999.00, category: "Displays", stock: 2, vendorId: "v1", tags: ["Hologram", "Display"], images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80"], description: "Projects high-fidelity volumetric 3D holograms.", createdAt: new Date().toISOString() },
        { _id: "demo-5", name: "Cybernetic Exo-Gauntlet", price: 4999.00, category: "Augmentation", stock: 3, vendorId: "v1", tags: ["Exo", "Military"], images: ["https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&auto=format&fit=crop&q=80"], description: "Military-grade exoskeleton gauntlet with pneumatic kinetic amplifiers and carbon-nanotube plating.", createdAt: new Date().toISOString() },
        { _id: "demo-6", name: "Neuro-Link Interface Helmet", price: 1250.00, category: "Wearables", stock: 12, vendorId: "v1", tags: ["BCI", "Neural"], images: ["https://images.unsplash.com/photo-1557683316-973673baf926?w=500&auto=format&fit=crop&q=80"], description: "Direct brain-computer interface helmet for immersive VR diving.", createdAt: new Date().toISOString() },
        { _id: "demo-7", name: "Pulse-Plasma Hoverboard", price: 899.99, category: "Transport", stock: 8, vendorId: "v1", tags: ["Hover", "Mobility"], images: ["https://images.unsplash.com/photo-1555661530-68c8e98db4e6?w=500&auto=format&fit=crop&q=80"], description: "Anti-gravity mobility device with dual pulse-plasma thrusters.", createdAt: new Date().toISOString() },
        { _id: "demo-8", name: "Zero-G Sleep Pod", price: 5500.00, category: "Furniture", stock: 1, vendorId: "v1", tags: ["Pod", "Rest"], images: ["https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=500&auto=format&fit=crop&q=80"], description: "Suspension sleep pod utilizing magnetic levitation for ultimate rest.", createdAt: new Date().toISOString() }
      ];

      try {
        const res = await fetch(`${API_URL}/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          // If product not found on backend (maybe it's a dummy ID), try our fallback array
          const fallback = dummyProducts.find(p => p._id === productId) || dummyProducts[0];
          setProduct(fallback);
        }
      } catch (e) {
        console.warn('Backend offline, using fallback dummy product data');
        const fallback = dummyProducts.find(p => p._id === productId) || dummyProducts[0];
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-[#131315] text-[#e5e1e4] font-body min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-2 border-[#4cd7f6]/30 border-t-[#4cd7f6] rounded-full animate-spin"></div>
          <p className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold">Loading Neural Asset...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#131315] text-[#e5e1e4] font-body min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-[#4cd7f6]/30 mb-4 block">error_outline</span>
          <h2 className="text-xl font-headline font-bold uppercase mb-2">{error || 'Product Not Found'}</h2>
          <Link href="/" className="text-[#4cd7f6] text-xs uppercase tracking-widest font-bold hover:underline">Return to Storefront</Link>
        </div>
      </div>
    );
  }

  const imageSrc = product.images?.[0] || '';
  const title = product.name.toUpperCase().replace(/\s+/g, '_');

  return (
    <div className="bg-[#131315] text-[#e5e1e4] font-body selection:bg-[#d0bcff]/30 min-h-screen">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(19, 19, 21, 0.15); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .tonal-shift { background: linear-gradient(to bottom, #131315, #0e0e10); }
        .neon-glow-violet { box-shadow: 0 0 15px rgba(208, 188, 255, 0.1); }
        .neon-glow-cyan { box-shadow: 0 8px 32px 0 rgba(76, 215, 246, 0.08); }
        @keyframes pulse-cyan { 0%, 100% { box-shadow: 0 0 15px rgba(76, 215, 246, 0.4), 0 0 30px rgba(76, 215, 246, 0.2); } 50% { box-shadow: 0 0 25px rgba(76, 215, 246, 0.7), 0 0 50px rgba(76, 215, 246, 0.4); } }
        @keyframes pulse-violet { 0%, 100% { box-shadow: 0 0 15px rgba(208, 188, 255, 0.4), 0 0 30px rgba(208, 188, 255, 0.2); } 50% { box-shadow: 0 0 25px rgba(208, 188, 255, 0.7), 0 0 50px rgba(208, 188, 255, 0.4); } }
        .glow-pulse-cyan { animation: pulse-cyan 3s infinite ease-in-out; }
        .glow-pulse-violet { animation: pulse-violet 3s infinite ease-in-out; }
      `}} />

      {/* Top Navigation Anchor */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-[#4cd7f6]/10 shadow-[0_8px_32px_0_rgba(76,215,246,0.08)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
          <Link href="/" className="text-2xl font-black tracking-tighter text-[#4cd7f6] font-headline uppercase">NEURAL_ARC</Link>
          <div className="hidden md:flex items-center gap-12">
            <Link className="text-slate-400 hover:text-[#4cd7f6] transition-colors font-headline tracking-tight uppercase" href="/">Storefront</Link>
            <Link className="text-slate-400 hover:text-[#4cd7f6] transition-colors font-headline tracking-tight uppercase" href="/products">Catalog</Link>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-[#4cd7f6] transition-all duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <Link href="/profile" className="w-10 h-10 rounded-full border border-[#4cd7f6]/20 overflow-hidden bg-[#2a2a2c] hover:border-[#4cd7f6]/50 hover:scale-105 transition-all cursor-pointer block">
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#4cd7f6]/50 text-sm">person</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-24 pb-12 px-8 min-h-screen grid grid-cols-12 gap-8 max-w-[1920px] mx-auto relative overflow-hidden">
        {/* Left Section: Product Image */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[819px] bg-[#0e0e10] rounded-[24px] overflow-hidden border border-[#3d494c]/10 group">
            {imageSrc ? (
              <img alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]" src={imageSrc}/>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0e0e10]">
                <span className="material-symbols-outlined text-8xl text-[#3d494c]/30">image</span>
              </div>
            )}
            <div className="absolute bottom-8 left-8 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#4cd7f6]">Live Product</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter text-white uppercase leading-none">{title}</h1>
              <p className="text-[#bcc9cd] font-medium tracking-wide">{product.category || 'Uncategorized'}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-[#4cd7f6]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-80 h-80 border border-[#d0bcff]/10 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
            </div>
          </div>
        </section>

        {/* Middle Section: Product Details & Metrics */}
        <section className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-[24px] border border-[#3d494c]/20 neon-glow-violet">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Price</p>
                <h3 className="text-3xl font-headline font-bold text-[#4cd7f6]">${product.price.toFixed(2)}</h3>
              </div>
              <span className="material-symbols-outlined text-[#d0bcff]">payments</span>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Stock Status</p>
                <h3 className="text-xl font-headline font-bold text-white uppercase">Real-Time Sync</h3>
              </div>
              <span className="material-symbols-outlined text-[#d0bcff]">database</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-headline font-bold text-[#4cd7f6]">{product.stock}</span>
              <span className="text-[#bcc9cd] text-sm pb-1">Units available</span>
            </div>
            <div className="w-full h-1.5 bg-[#353437] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] rounded-full shadow-[0_0_10px_#4cd7f6]" style={{ width: `${Math.min(product.stock, 100)}%` }}></div>
            </div>
            <p className="mt-3 text-[10px] text-[#bcc9cd] italic">Product ID: {product._id}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#1c1b1d] p-6 rounded-[24px] border border-[#3d494c]/10 hover:border-[#4cd7f6]/40 transition-all cursor-default group hover:-translate-y-1 hover:scale-[1.01]">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-md bg-[#4cd7f6]/10 text-[#4cd7f6]">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <span className="font-headline font-bold tracking-tight text-lg uppercase">Description</span>
              </div>
              <p className="text-sm text-[#bcc9cd] leading-relaxed">{product.description || 'No description available for this product.'}</p>
            </div>
            {product.tags && product.tags.length > 0 && (
              <div className="bg-[#1c1b1d] p-6 rounded-[24px] border border-[#3d494c]/10 hover:border-[#d0bcff]/40 transition-all cursor-default group hover:-translate-y-1 hover:scale-[1.01]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 rounded-md bg-[#d0bcff]/10 text-[#d0bcff]">
                    <span className="material-symbols-outlined">label</span>
                  </div>
                  <span className="font-headline font-bold tracking-tight text-lg uppercase">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-[#353437] text-[#bcc9cd] text-xs uppercase tracking-widest border border-[#3d494c]/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <button className="w-full py-5 rounded-full bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.2em] scale-100 hover:scale-[1.05] active:scale-95 transition-all duration-300 glow-pulse-cyan flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">shopping_cart</span> ADD TO CART
            </button>
            <button className="w-full py-5 rounded-full bg-[#d0bcff] text-[#3c0091] font-headline font-black uppercase tracking-[0.2em] scale-100 hover:scale-[1.05] active:scale-95 transition-all duration-300 glow-pulse-violet flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">payments</span> PURCHASE NOW
            </button>
          </div>
        </section>

        {/* Right Section: AI Stylist Sidebar */}
        <section className="col-span-12 lg:col-span-3 flex flex-col bg-[#0e0e10]/50 backdrop-blur-md rounded-[24px] border border-[#3d494c]/10 overflow-hidden neon-glow-violet h-[819px] sticky top-24">
          <div className="p-6 border-b border-[#3d494c]/10 flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#571bc1] flex items-center justify-center text-[#d0bcff]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#eec200] rounded-full border-2 border-[#131315]"></div>
            </div>
            <div>
              <h4 className="font-headline font-bold text-white uppercase tracking-tight">AI Stylist</h4>
              <p className="text-[10px] text-[#eec200] font-bold tracking-widest uppercase">Consultant Online</p>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-[#571bc1]/20 p-4 rounded-xl rounded-tl-none border border-[#d0bcff]/20">
                <p className="text-sm text-white leading-relaxed">Greetings, Architect. The <span className="text-[#4cd7f6] font-bold">{product.name}</span> is a popular choice in the <span className="text-[#d0bcff] font-bold">{product.category}</span> category. Currently {product.stock} units in stock.</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">AI Analysis</span>
            </div>
            <div className="flex flex-col gap-2 max-w-[85%] ml-auto items-end">
              <div className="bg-[#353437] p-4 rounded-xl rounded-tr-none border border-[#3d494c]/20">
                <p className="text-sm text-white leading-relaxed">What can you tell me about this product?</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">User Query</span>
            </div>
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-[#571bc1]/20 p-4 rounded-xl rounded-tl-none border border-[#d0bcff]/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span className="text-[10px] uppercase font-bold text-[#d0bcff]">AI Assessment</span>
                </div>
                <p className="text-sm text-white leading-relaxed">{product.description || 'This product is available for purchase. Add it to your cart to proceed with checkout.'}</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">AI Response</span>
            </div>
          </div>
          
          <div className="p-6 bg-[#1c1b1d] border-t border-[#3d494c]/10">
            <div className="relative">
              <input className="w-full bg-[#0e0e10] border border-[#3d494c]/20 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-[#d0bcff] transition-all placeholder:text-slate-600" placeholder="Consult the AI Architect..." type="text"/>
              <button className="absolute right-2 top-1.5 w-9 h-9 bg-[#d0bcff] rounded-full text-[#3c0091] flex items-center justify-center hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-12 px-8 mt-auto bg-[#0e0e10] border-t border-[#4cd7f6]/10 flex flex-col items-center gap-6">
        <div className="flex gap-12">
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">Privacy Protocol</Link>
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">Terms of Service</Link>
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">API Docs</Link>
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">Neural Network Status</Link>
        </div>
        <p className="text-slate-600 font-body text-[10px] tracking-widest uppercase">© 2024 NEURAL ARCHITECT. ALL ASSETS RENDERED IN 8K.</p>
      </footer>
    </div>
  );
}
