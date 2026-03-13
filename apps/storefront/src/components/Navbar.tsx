'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { totalItems, setCartOpen, isCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b-0 rounded-none border-b-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.5)]">
            <span className="font-bold text-background text-xl select-none">N</span>
          </div>
          <span className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-text-sub">
            NEXT<span className="text-neon-blue">GEN</span>
          </span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="/" className="text-sm font-medium tracking-wider hover:text-neon-blue transition-colors uppercase">Home</a>
          <a href="/products" className="text-sm font-medium tracking-wider hover:text-neon-purple transition-colors uppercase">Catalog</a>
          
          {isAuthenticated ? (
            <>
              <a href="/orders" className="text-sm font-medium tracking-wider hover:text-neon-blue transition-colors uppercase">My Orders</a>
              <button 
                onClick={logout}
                className="text-sm font-medium tracking-wider text-neon-pink hover:text-white transition-colors uppercase"
              >
                Logout ({user?.role})
              </button>
            </>
          ) : (
             <a href="/login" className="text-sm font-medium tracking-wider hover:text-neon-pink transition-colors uppercase">Login</a>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <div 
            className="relative cursor-pointer group p-2"
            onClick={() => setCartOpen(!isCartOpen)}
          >
            <svg className="w-6 h-6 text-text-sub group-hover:text-neon-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-neon-pink text-white text-[10px] font-bold h-4 min-w-[16px] flex items-center justify-center rounded-full px-1 shadow-[0_0_10px_rgba(255,0,127,0.8)] animate-pulse">
                {totalItems}
              </span>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-text-sub transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-text-sub transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-text-sub transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[rgba(255,255,255,0.05)] bg-surface/95 backdrop-blur-lg">
          <nav className="flex flex-col px-6 py-6 gap-4">
            <a href="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-wider hover:text-neon-blue transition-colors uppercase py-2 border-b border-[rgba(255,255,255,0.05)]">Home</a>
            <a href="/products" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-wider hover:text-neon-purple transition-colors uppercase py-2 border-b border-[rgba(255,255,255,0.05)]">Catalog</a>
            
            {isAuthenticated ? (
              <>
                <a href="/orders" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-wider hover:text-neon-blue transition-colors uppercase py-2 border-b border-[rgba(255,255,255,0.05)]">My Orders</a>
                <button 
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="text-sm font-medium tracking-wider text-neon-pink hover:text-white transition-colors uppercase py-2 text-left"
                >
                  Logout ({user?.role})
                </button>
              </>
            ) : (
              <>
                <a href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-wider hover:text-neon-pink transition-colors uppercase py-2 border-b border-[rgba(255,255,255,0.05)]">Login</a>
                <a href="/register" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-wider hover:text-neon-purple transition-colors uppercase py-2">Register</a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
