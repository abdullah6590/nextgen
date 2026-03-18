'use client';

import React from 'react';

interface FeaturedProductProps {
  title: string;
  price: string;
  category: string;
  matchScore: string;
  imageSrc: string;
  isQuickPurchase?: boolean;
}

export const FeaturedProduct = ({
  title,
  price,
  category,
  matchScore,
  imageSrc,
  isQuickPurchase = false
}: FeaturedProductProps) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 row-span-1 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 hover-lift group">
      <div className="h-48 relative">
        <img alt={title} className="w-full h-full object-cover" src={imageSrc} />
        <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-black px-2 py-1 rounded-sm shadow-lg">{matchScore}</div>
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-12rem)] justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-headline font-bold text-lg leading-none">{title}</h3>
            <span className="text-primary font-bold">{price}</span>
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">{category}</p>
        </div>
        
        {isQuickPurchase ? (
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] font-bold text-[10px] uppercase tracking-widest hover:bg-[#06b6d4]/20 transition-all active:scale-95 btn-glow-cyan backdrop-blur-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
              ADD TO CART
            </button>
            <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 btn-glow-violet flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
              QUICK PURCHASE
            </button>
          </div>
        ) : (
          <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 rounded-full text-xs font-bold uppercase tracking-widest group-hover:shadow-[0_0_15px_rgba(76,215,246,0.4)] transition-all">Acquire Asset</button>
        )}
      </div>
    </div>
  );
};
