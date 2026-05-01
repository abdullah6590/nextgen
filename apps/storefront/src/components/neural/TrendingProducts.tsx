'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

export const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8080/products?limit=4&page=1');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (e) {
        console.error('Failed to fetch trending products:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="col-span-12 row-span-1">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#4cd7f6] animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#4cd7f6] animate-ping opacity-30"></div>
          </div>
          <h2 className="font-headline text-2xl font-black uppercase tracking-tight">TRENDING_NOW</h2>
          <span className="bg-[#4cd7f6]/10 text-[#4cd7f6] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#4cd7f6]/20">
            Live Feed
          </span>
        </div>
        <Link href="/products" className="text-xs text-[#4cd7f6]/60 hover:text-[#4cd7f6] transition-colors uppercase tracking-widest font-bold flex items-center gap-1">
          View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="bg-surface-container-low rounded-[20px] overflow-hidden border border-outline-variant/10 animate-pulse">
              <div className="aspect-square bg-surface-container-high"></div>
              <div className="p-5 space-y-3">
                <div className="h-3 bg-surface-container-high rounded w-3/4"></div>
                <div className="h-2 bg-surface-container-high rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="col-span-4 text-center py-12">
            <span className="material-symbols-outlined text-3xl text-outline/30 mb-2 block">trending_up</span>
            <p className="text-on-surface-variant text-xs uppercase tracking-widest">No trending products available</p>
          </div>
        ) : (
          products.map((product, idx) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group relative bg-surface-container-low rounded-[20px] overflow-hidden border border-outline-variant/10 hover:border-[#4cd7f6]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(76,215,246,0.15)]"
            >
              {/* Trending Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#131315]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#4cd7f6]/20">
                <span className="material-symbols-outlined text-[#4cd7f6] text-sm">trending_up</span>
                <span className="text-[10px] text-[#4cd7f6] font-bold uppercase tracking-widest">#{idx + 1} Trending</span>
              </div>

              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={product.images[0]}
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline/20">image</span>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent opacity-60"></div>

                {/* Scan line effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(76,215,246,0.03) 2px, rgba(76,215,246,0.03) 4px)`,
                  }}
                ></div>
              </div>

              {/* Product Info */}
              <div className="p-5 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-sm uppercase tracking-tight leading-tight group-hover:text-[#4cd7f6] transition-colors line-clamp-2 flex-1 mr-2">
                    {product.name}
                  </h3>
                  <span className="text-[#4cd7f6] font-headline font-bold text-lg flex-shrink-0">${product.price.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{product.category || 'General'}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${product.stock < 10 ? 'text-red-400' : 'text-green-400'}`}>
                    {product.stock < 10 ? `${product.stock} left` : 'In Stock'}
                  </span>
                </div>
              </div>

              {/* Bottom glow line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4cd7f6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
