'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';

interface CatalogProductCardProps {
  id: string;
  title: string;
  category: string;
  priceStr: string;
  imageSrc: string;
  badge?: {
    text: string;
    styleClass: string;
  };
  buttonStyleClass: string;
}

export const CatalogProductCard: React.FC<CatalogProductCardProps> = ({
  id,
  title,
  category,
  priceStr,
  imageSrc,
  badge,
  buttonStyleClass
}) => {
  const { addToCart } = useCart();
  const router = useRouter();

  // Parse price like "0.85" or "1.20" from priceStr
  const numericPrice = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: id,
      name: title,
      price: numericPrice,
      quantity: 1,
      image: imageSrc
    });
  };

  const handleAcquire = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: id,
      name: title,
      price: numericPrice,
      quantity: 1,
      image: imageSrc
    });
    router.push('/checkout');
  };

  return (
    <div className="group relative bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col justify-between">
      <Link href={`/product/${id}`} className="absolute inset-0 z-10" aria-label={`View ${title}`} />
      
      <div className="aspect-square rounded-lg bg-surface-container-lowest mb-6 overflow-hidden relative pointer-events-none">
        <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={title} src={imageSrc} />
        {badge && (
          <div className="absolute top-4 right-4">
            <span className={badge.styleClass}>{badge.text}</span>
          </div>
        )}
      </div>
      
      <h4 className="text-xl font-bold font-headline mb-2">{title}</h4>
      
      <div className="flex justify-between items-end mb-6">
        <span className="text-slate-500 text-xs text-nowrap mr-2">{category}</span>
        <span className="text-lg font-bold text-on-surface">Ξ {priceStr}</span>
      </div>
      
      <div className="flex gap-2 mt-auto relative z-20">
        <button 
          onClick={handleAcquire} 
          className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${buttonStyleClass}`}
        >
          ACQUIRE
        </button>
        <button 
          onClick={handleAddToCart} 
          className="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-full hover:bg-white/5 transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-sm">shopping_cart</span>
        </button>
      </div>
    </div>
  );
};
