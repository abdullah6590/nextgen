'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  stock: number;
}

export const MonthlySpecial = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch page 2 so we get different products from TrendingProducts
        const res = await fetch('http://localhost:8080/products?limit=4&page=2');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (e) {
        console.error('Failed to fetch monthly specials:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const heroProduct = products[0];
  const supportingProducts = products.slice(1, 4);

  if (loading) {
    return (
      <div className="col-span-12 row-span-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 rounded-full bg-[#d0bcff] animate-pulse"></div>
          <h2 className="font-headline text-2xl font-black uppercase tracking-tight">THIS_MONTH // SPECIAL</h2>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7 aspect-[16/9] bg-surface-container-low rounded-[24px] animate-pulse border border-outline-variant/10"></div>
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 bg-surface-container-low rounded-[20px] animate-pulse border border-outline-variant/10"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="col-span-12 row-span-1">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#d0bcff] animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#d0bcff] animate-ping opacity-30"></div>
          </div>
          <h2 className="font-headline text-2xl font-black uppercase tracking-tight">THIS_MONTH // SPECIAL</h2>
          <span className="bg-[#d0bcff]/10 text-[#d0bcff] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#d0bcff]/20 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs">schedule</span>
            Limited Time
          </span>
        </div>
        <Link href="/products" className="text-xs text-[#d0bcff]/60 hover:text-[#d0bcff] transition-colors uppercase tracking-widest font-bold flex items-center gap-1">
          Browse All <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* Hero + Supporting Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Hero Product — Large Card */}
        {heroProduct && (
          <Link
            href={`/product/${heroProduct._id}`}
            className="col-span-12 lg:col-span-7 group relative bg-surface-container-low rounded-[24px] overflow-hidden border border-[#d0bcff]/10 hover:border-[#d0bcff]/40 transition-all duration-500 hover:shadow-[0_20px_80px_-15px_rgba(208,188,255,0.15)]"
          >
            {/* Hero Image */}
            <div className="aspect-[16/9] relative overflow-hidden">
              {heroProduct.images?.[0] ? (
                <img
                  alt={heroProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                  src={heroProduct.images[0]}
                />
              ) : (
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-outline/20">image</span>
                </div>
              )}

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#131315]/50 to-transparent"></div>

              {/* Circuit pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, rgba(208,188,255,1) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(208,188,255,1) 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px',
                }}
              ></div>

              {/* Special Badge */}
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6] text-[#131315] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_30px_rgba(208,188,255,0.4)]">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  Monthly Special
                </div>
              </div>

              {/* Product Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[10px] text-[#d0bcff] uppercase tracking-widest font-bold mb-2">{heroProduct.category || 'Featured'}</p>
                <h3 className="font-headline text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none mb-3 group-hover:text-[#d0bcff] transition-colors">
                  {heroProduct.name}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-headline font-bold text-[#4cd7f6]">${heroProduct.price.toFixed(2)}</span>
                  <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                    {heroProduct.stock > 0 ? `${heroProduct.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                {heroProduct.description && (
                  <p className="text-sm text-[#bcc9cd] mt-3 leading-relaxed line-clamp-2 max-w-lg">{heroProduct.description}</p>
                )}
              </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d0bcff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        )}

        {/* Supporting Products — Small Cards */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          {supportingProducts.map((product, idx) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group flex items-center gap-4 bg-surface-container-low rounded-[20px] p-4 border border-outline-variant/10 hover:border-[#d0bcff]/30 transition-all duration-300 hover:-translate-x-1 hover:shadow-[0_0_30px_-10px_rgba(208,188,255,0.1)]"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/10">
                {product.images?.[0] ? (
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={product.images[0]}
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline/30">image</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff]"></span>
                  <span className="text-[10px] text-[#d0bcff] uppercase tracking-widest font-bold">{product.category || 'Special'}</span>
                </div>
                <h4 className="font-headline font-bold text-sm uppercase tracking-tight truncate group-hover:text-[#d0bcff] transition-colors">{product.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#4cd7f6] font-bold font-headline">${product.price.toFixed(2)}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${product.stock < 10 ? 'text-red-400' : 'text-green-400/60'}`}>
                    {product.stock < 10 ? `Only ${product.stock} left` : 'Available'}
                  </span>
                </div>
              </div>

              <span className="material-symbols-outlined text-outline/20 group-hover:text-[#d0bcff] transition-colors">chevron_right</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
