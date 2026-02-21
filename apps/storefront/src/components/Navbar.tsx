'use client';

import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { totalItems, setCartOpen, isCartOpen } = useCart();

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b-0 rounded-none border-b-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-neonBlue to-neonPurple flex items-center justify-center shadow-neon-blue">
            <span className="font-bold text-background text-xl select-none">N</span>
          </div>
          <span className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-textSub">
            NEXT<span className="text-neonBlue">GEN</span>
          </span>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          <a href="/" className="text-sm font-medium tracking-wider hover:text-neonBlue transition-colors uppercase">Home</a>
          <a href="/products" className="text-sm font-medium tracking-wider hover:text-neonPurple transition-colors uppercase">Catalog</a>
          
          {isAuthenticated ? (
            <>
              <a href="/orders" className="text-sm font-medium tracking-wider hover:text-neonBlue transition-colors uppercase">My Orders</a>
              <button 
                onClick={logout}
                className="text-sm font-medium tracking-wider text-neonPink hover:text-white transition-colors uppercase"
              >
                Logout ({user?.role})
              </button>
            </>
          ) : (
             <a href="/login" className="text-sm font-medium tracking-wider hover:text-neonPink transition-colors uppercase">Login</a>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div 
            className="relative cursor-pointer group p-2"
            onClick={() => setCartOpen(!isCartOpen)}
          >
            <svg className="w-6 h-6 text-textSub group-hover:text-neonBlue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-neonPink text-white text-[10px] font-bold h-4 min-w-[16px] flex items-center justify-center rounded-full px-1 shadow-[0_0_10px_rgba(255,0,127,0.8)] animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
