'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

const API_URL = 'http://localhost:8080';

export const CentralSearchHub = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchQuery?: string) => {
    const q = (searchQuery ?? query).trim();
    if (!q) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`${API_URL}/products?search=${encodeURIComponent(q)}&limit=12`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.products || []);
      }
    } catch (e) {
      console.error('Search failed:', e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    handleSearch(tag);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="col-span-12 lg:col-span-8 row-span-2 glass-panel border border-cyan-500/20 rounded-lg p-12 flex flex-col justify-center items-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

      {!hasSearched && (
        <>
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            <span className="material-symbols-outlined text-8xl text-primary relative z-10" style={{ fontVariationSettings: '"FILL" 1' }}>psychology</span>
          </div>
          <h1 className="font-headline text-5xl font-black tracking-tighter text-center mb-6 uppercase max-w-2xl leading-none">
            Architect Your Reality with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aetheris AI</span>
          </h1>
        </>
      )}

      {hasSearched && (
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <span className="material-symbols-outlined text-primary text-3xl">search</span>
          <h2 className="font-headline text-2xl font-black uppercase tracking-tight">
            Search Results {results.length > 0 && <span className="text-primary">({results.length})</span>}
          </h2>
          <button onClick={clearSearch} className="ml-4 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary hover:border-primary/30 transition-all">
            Clear
          </button>
        </div>
      )}

      <div className="w-full max-w-xl relative z-10">
        <input
          className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-full px-8 py-5 text-lg font-body focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-600"
          placeholder="Search products, categories, or tags..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
          className="absolute right-3 top-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary p-3 rounded-full hover:scale-105 active:scale-95 transition-transform flex items-center justify-center disabled:opacity-50"
        >
          <span className="material-symbols-outlined">{loading ? 'progress_activity' : 'search'}</span>
        </button>
      </div>

      {!hasSearched && (
        <div className="flex gap-4 mt-8 flex-wrap justify-center relative z-10">
          {['headphones', 'camera', 'sneakers', 'smartwatch', 'drone'].map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-xs font-label uppercase tracking-widest text-slate-400 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Grid */}
      {hasSearched && (
        <div className="w-full mt-8 relative z-10">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-surface-container-low rounded-[16px] overflow-hidden border border-outline-variant/10 animate-pulse">
                  <div className="aspect-square bg-surface-container-high"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-surface-container-high rounded w-3/4"></div>
                    <div className="h-2 bg-surface-container-high rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-4xl text-outline/30 mb-3 block">search_off</span>
              <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-1">No products found for</p>
              <p className="text-primary font-headline font-bold text-lg">"{query}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {results.map(product => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="group bg-surface-container-low rounded-[16px] overflow-hidden border border-outline-variant/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(76,215,246,0.15)]"
                >
                  <div className="aspect-square relative overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={product.images[0]}
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-outline/20">image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-headline font-bold text-xs uppercase tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{product.category || 'General'}</span>
                      <span className="text-primary font-headline font-bold text-sm">${product.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
