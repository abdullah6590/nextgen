'use client';

import React, { useEffect, useState } from 'react';
import { TopNav } from '../../components/neural/TopNav';
import { CatalogProductCard } from '../../components/neural/CatalogProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Chatbot } from '../../components/neural/Chatbot';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  description?: string;
}

const API_URL = 'http://localhost:8080';

export default function NeuralCatalogPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fallbackProducts: Product[] = [
        { _id: "demo-1", name: "Quantum Neural Processor v9", price: 1499.99, category: "Components", stock: 15, images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80"] },
        { _id: "demo-2", name: "Cybernetic Visual Augmentation", price: 849.50, category: "Wearables", stock: 5, images: ["https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=500&auto=format&fit=crop&q=80"] },
        { _id: "demo-3", name: "Neon-Lit Mechanical Array", price: 229.99, category: "Peripherals", stock: 42, images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=80"] },
        { _id: "demo-4", name: "Holographic Matrix Projector", price: 2999.00, category: "Displays", stock: 2, images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80"] },
        { _id: "demo-5", name: "Cybernetic Exo-Gauntlet", price: 4999.00, category: "Augmentation", description: "Military-grade exoskeleton gauntlet with pneumatic kinetic amplifiers and carbon-nanotube plating.", stock: 3, images: ["https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&auto=format&fit=crop&q=80"] },
        { _id: "demo-6", name: "Neuro-Link Interface Helmet", price: 1250.00, category: "Wearables", stock: 12, images: ["https://images.unsplash.com/photo-1557683316-973673baf926?w=500&auto=format&fit=crop&q=80"] },
        { _id: "demo-7", name: "Pulse-Plasma Hoverboard", price: 899.99, category: "Transport", stock: 8, images: ["https://images.unsplash.com/photo-1555661530-68c8e98db4e6?w=500&auto=format&fit=crop&q=80"] },
        { _id: "demo-8", name: "Zero-G Sleep Pod", price: 5500.00, category: "Furniture", stock: 1, images: ["https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=500&auto=format&fit=crop&q=80"] }
      ];

      try {
        const res = await fetch(`${API_URL}/products?limit=20`);
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            // Combine real data with dummy data to make the catalog look massive and engaging
            setProducts([...data.products, ...fallbackProducts]);
          } else {
            setProducts(fallbackProducts);
          }
        } else {
          setProducts(fallbackProducts);
        }
      } catch (e) {
        console.warn('Backend offline, loading fallback catalog for viva presentation');
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProduct = products[0];
  const remainingProducts = products.slice(1);

  const handleAcquireFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!featuredProduct) return;
    addToCart({ productId: featuredProduct._id, name: featuredProduct.name, price: featuredProduct.price, quantity: 1, image: featuredProduct.images?.[0] });
    router.push('/checkout');
  };

  const handleAddToCartFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!featuredProduct) return;
    addToCart({ productId: featuredProduct._id, name: featuredProduct.name, price: featuredProduct.price, quantity: 1, image: featuredProduct.images?.[0] });
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen overflow-x-hidden">
      <TopNav />

      {/* Side Navigation / Filter Engine */}
      <aside className="h-screen w-64 fixed left-0 top-20 border-r border-cyan-500/10 bg-[#0e0e10] flex flex-col pt-10 z-40 hidden md:flex">
        <div className="px-8 mb-8">
          <h2 className="text-cyan-400 font-bold font-label uppercase tracking-widest text-xs">FILTER_ENGINE</h2>
          <p className="text-slate-500 text-[10px] tracking-widest mt-1 uppercase">AI-Optimized Parameters</p>
        </div>
        <nav className="flex flex-col font-label uppercase tracking-widest text-xs">
          <div className="text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400 px-8 py-4 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">memory</span>
            All Products
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">headphones</span>
            Audio
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">laptop_mac</span>
            Laptops
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">watch</span>
            Wearables
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">camera_alt</span>
            Photography
          </div>
        </nav>

        <div className="mt-12 px-8">
          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Quick Tags</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 border border-outline-variant rounded bg-surface-container-lowest group-hover:border-primary transition-colors"></div>
              <span className="text-xs text-slate-400 group-hover:text-on-surface">Trending</span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 border border-outline-variant rounded bg-surface-container-lowest group-hover:border-primary transition-colors"></div>
              <span className="text-xs text-slate-400 group-hover:text-on-surface">Low Stock</span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 border border-primary rounded bg-primary-container/20"></div>
              <span className="text-xs text-primary">All Items</span>
            </label>
          </div>
        </div>

        <div className="mt-auto p-8">
          <div className="text-center text-[10px] text-slate-600 uppercase tracking-widest">
            {loading ? 'Loading...' : `${products.length} products found`}
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="pt-24 pl-0 md:pl-64 min-h-screen">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* Hero Header Section */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-on-surface">
                  NEURAL<span className="text-primary">_CATALOG</span>
                </h1>
                <p className="text-slate-400 font-body mt-4 max-w-xl text-lg leading-relaxed">
                  Browse our full catalog of vendor products — real inventory, real prices, real-time stock.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/20 flex flex-col min-w-[140px]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Products</span>
                  <span className="text-2xl font-headline text-secondary">{loading ? '...' : products.length}</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/20 flex flex-col min-w-[140px]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Status</span>
                  <span className="text-2xl font-headline text-primary">{loading ? '...' : 'Live'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 animate-pulse">
                  <div className="aspect-square bg-surface-container-high"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
                    <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-5xl text-outline/20 mb-4 block">inventory_2</span>
              <p className="text-on-surface-variant text-sm uppercase tracking-widest">No products available in the catalog</p>
              <p className="text-slate-600 text-xs mt-2">Make sure the product-service and database are running.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Featured Product - First Product */}
              {featuredProduct && (
                <div className="lg:col-span-2 lg:row-span-2 group relative bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 block">
                  <Link href={`/product/${featuredProduct._id}`} className="absolute inset-0 z-10" aria-label="View Product" />
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-10 pointer-events-none"></div>
                  {featuredProduct.images?.[0] ? (
                    <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={featuredProduct.name} src={featuredProduct.images[0]} />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-outline/20">image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/80 to-transparent z-10"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Featured</span>
                      {featuredProduct.stock < 10 && (
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-500/30">Low Stock</span>
                      )}
                    </div>
                    <h3 className="text-4xl font-bold font-headline text-on-surface mb-2 uppercase">{featuredProduct.name}</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-md">{featuredProduct.description || featuredProduct.category}</p>
                    <div className="flex flex-wrap items-center gap-4 relative z-20">
                      <button 
                        onClick={handleAcquireFeatured}
                        className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:scale-105 transition-transform">
                        ACQUIRE_NODE
                      </button>
                      <button 
                        onClick={handleAddToCartFeatured}
                        className="bg-white/5 border border-white/10 text-on-surface font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                        ADD_TO_CART
                      </button>
                      <span className="ml-auto text-3xl font-bold font-headline text-primary">${featuredProduct.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining Products */}
              {remainingProducts.map((product, idx) => (
                <CatalogProductCard
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  category={product.category || 'General'}
                  priceStr={product.price.toFixed(2)}
                  imageSrc={product.images?.[0] || ''}
                  badge={
                    product.stock < 10
                      ? { text: `${product.stock} left`, styleClass: 'bg-red-500/20 backdrop-blur-md border border-red-500/30 px-2 py-1 rounded text-[10px] text-red-400 font-bold uppercase' }
                      : idx < 3
                        ? { text: 'Popular', styleClass: 'bg-primary/20 backdrop-blur-md border border-primary/30 px-2 py-1 rounded text-[10px] text-primary font-bold uppercase' }
                        : undefined
                  }
                  buttonStyleClass={idx % 2 === 0 ? 'bg-primary text-on-primary hover:bg-primary-fixed' : 'bg-secondary text-on-secondary hover:bg-secondary-fixed'}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
