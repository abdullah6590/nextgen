'use client';

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from './Button';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-surface border-l border-[rgba(255,255,255,0.05)] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
            Inventory Cache
          </h2>
          <button 
            onClick={() => setCartOpen(false)}
            className="text-text-sub hover:text-neon-pink transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-sub opacity-50">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <p className="uppercase tracking-widest font-mono text-xs">Cache Empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-4 border border-[rgba(255,255,255,0.05)] bg-surface-hover/50 p-4 rounded">
                <div className="w-20 h-20 bg-background rounded border border-[rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden">
                   {item.image ? (
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-neon-blue opacity-30 font-mono text-xs">IMG_NA</span>
                   )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{item.name}</h3>
                    <p className="text-neon-blue font-mono text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-background rounded px-2 py-1 border border-[rgba(255,255,255,0.05)]">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="text-text-sub hover:text-white">-</button>
                      <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="text-text-sub hover:text-white">+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-text-sub hover:text-neon-pink text-xs uppercase tracking-wider transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[rgba(255,255,255,0.05)] bg-surface-hover/30">
            <div className="flex justify-between items-center mb-6">
              <span className="text-text-sub uppercase tracking-widest text-sm">Total Value</span>
              <span className="text-neon-blue font-mono text-xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
