'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '../../../lib/api';
import { useCart } from '../../../contexts/CartContext';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  vendorId: string;
  images: string[];
  tags: string[];
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Send userId if available for Kafka view tracking
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        let userId = '';
        if (storedToken) {
          try {
             const payload = JSON.parse(atob(storedToken.split('.')[1]));
             userId = payload.userId;
          } catch(e) {}
        }

        const { data } = await api.get(`/products/${id}${userId ? `?userId=${userId}` : ''}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to retrieve hardware specifications.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
         <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-6">
        <h1 className="text-4xl font-bold text-neon-pink uppercase tracking-widest mb-4">404 // Not Found</h1>
        <p className="text-text-sub font-mono mb-8 opacity-80">{error || 'The requested asset does not exist in our database.'}</p>
        <Button onClick={() => router.push('/products')} variant="secondary">Return to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Visualizer */}
        <div className="space-y-4">
          <Card className="aspect-square relative flex items-center justify-center border border-[rgba(255,255,255,0.05)] bg-surface-hover/50 p-2">
            {product.images?.[activeImage] ? (
              <img src={product.images[activeImage]} className="w-full h-full object-cover rounded shadow-lg" alt={product.name} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neon-blue opacity-30 font-mono">
                 <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 <span className="mt-4 text-sm tracking-widest uppercase">Visual Data Missing</span>
              </div>
            )}
            
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/20 to-transparent mix-blend-screen opacity-10 pointer-events-none"></div>
          </Card>
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
               {product.images.map((img, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => setActiveImage(idx)}
                   className={`aspect-square rounded border cursor-pointer hover:border-neon-blue transition-colors ${activeImage === idx ? 'border-neon-blue' : 'border-[rgba(255,255,255,0.1)]'}`}
                 >
                    <img src={img} className="w-full h-full object-cover rounded opacity-80 hover:opacity-100" />
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Specs */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-4">
             <span className="text-neon-purple text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full">
               {product.category}
             </span>
             {product.stock <= 0 && (
               <span className="text-red-500 text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Offline
               </span>
             )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="mb-8 p-4 bg-surface rounded-xl border border-[rgba(255,255,255,0.05)] border-l-2 border-l-neon-blue">
             <div className="text-sm font-bold tracking-widest text-text-sub uppercase mb-2">Technical Description</div>
             <p className="text-text-main leading-relaxed opacity-90">{product.description || 'No description available for this unit.'}</p>
          </div>
          
          <div className="flex items-end gap-6 mb-8 pb-8 border-b border-[rgba(255,255,255,0.05)]">
            <div>
              <div className="text-sm font-bold tracking-widest text-text-sub uppercase mb-1">Exchange Rate</div>
              <div className="text-4xl font-mono text-white tracking-widest">${product.price.toFixed(2)}</div>
            </div>
            
            {product.stock > 0 && (
              <div className="flex flex-col">
                <div className="text-sm font-bold tracking-widest text-text-sub uppercase mb-1">Quantity</div>
                <div className="flex items-center gap-4 bg-surface rounded px-4 py-2 border border-[rgba(255,255,255,0.1)]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-neon-blue hover:text-white pb-1">-</button>
                  <span className="font-mono w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-neon-blue hover:text-white pb-1">+</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Button 
                className="w-full sm:w-2/3 py-4 text-sm" 
                variant="primary"
                disabled={product.stock <= 0}
                onClick={() => addToCart({
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  quantity,
                  image: product.images?.[0]
                })}
            >
               {product.stock > 0 ? 'Initialize Purchase Subroutine' : 'Unit Unavailable'}
            </Button>
            <Button className="w-full sm:w-1/3 py-4 text-sm" variant="glass" onClick={() => router.push('/products')}>
               Abort // Back
            </Button>
          </div>
          
          {/* Decorative tech specs */}
          <div className="mt-12 grid grid-cols-2 gap-4 gap-y-6 pt-8 border-t border-[rgba(255,255,255,0.05)]">
             <div>
                <div className="text-[10px] font-mono text-text-sub tracking-widest uppercase">Identifier</div>
                <div className="text-xs font-mono text-neon-blue mt-1 break-all">{product._id}</div>
             </div>
             <div>
                <div className="text-[10px] font-mono text-text-sub tracking-widest uppercase">Vendor Link</div>
                <div className="text-xs font-mono text-neon-purple mt-1 break-all">{product.vendorId}</div>
             </div>
             {product.tags?.length > 0 && (
               <div className="col-span-2">
                  <div className="text-[10px] font-mono text-text-sub tracking-widest uppercase mb-2">Classifications</div>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-neon-blue px-2 py-0.5 border border-neon-blue/30 rounded backdrop-blur bg-neon-blue/5 uppercase">#{tag}</span>
                    ))}
                  </div>
               </div>
             )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
