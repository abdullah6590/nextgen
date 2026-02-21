'use client';

import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useCart } from '../../contexts/CartContext';
import Link from 'next/link';
import { Input } from '../../components/Input';

interface Product {
  _id: string; // MongoDB ObjectId
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  const fetchProducts = async (searchQuery = '') => {
    setLoading(true);
    try {
      const { data } = await api.get('/products', {
        params: { search: searchQuery || undefined }
      });
      setProducts(data.products || []);
    } catch (e) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-white uppercase mb-2">
            Hardware Catalog
          </h1>
          <p className="text-textSub font-mono text-sm opacity-60">Browse available cybernetics and upgrades</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
           <Input 
             label="" 
             placeholder="Search inventory..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full md:w-64 bg-surfaceHover border-[rgba(255,255,255,0.1)] focus:border-neonBlue"
             style={{ marginTop: 0 }}
           />
           <Button type="submit" variant="primary">Scan</Button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="w-16 h-16 border-4 border-neonBlue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-xl border border-[rgba(255,255,255,0.05)]">
           <span className="text-textSub uppercase tracking-widest font-mono">No matching tech found.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="group hover:-translate-y-2 transition-transform duration-300 flex flex-col p-4 border border-[rgba(255,255,255,0.05)] hover:border-neonBlue/50">
              <Link href={`/products/${product._id}`} className="block relative aspect-square bg-surfaceHover rounded overflow-hidden mb-4">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-neonBlue opacity-30 font-mono text-sm">IMAGE_SYS_ERR</span>
                  </div>
                )}
                {product.stock <= 0 && (
                   <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
                     Depleted
                   </div>
                )}
              </Link>

              <div className="flex-grow flex flex-col">
                <div className="text-[10px] text-neonPurple font-mono uppercase tracking-widest mb-1">{product.category || 'Gear'}</div>
                <Link href={`/products/${product._id}`} className="hover:text-neonBlue transition-colors">
                  <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{product.name}</h3>
                </Link>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <span className="text-xl font-bold font-mono text-neonBlue">${product.price.toFixed(2)}</span>
                  <Button 
                    variant="glass" 
                    className="p-2 !px-3 text-xs"
                    disabled={product.stock <= 0}
                    onClick={() => addToCart({
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      image: product.images?.[0]
                    })}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
