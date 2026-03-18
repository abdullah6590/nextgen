'use client';

import React from 'react';

export const TopNav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_8px_32px_0_rgba(76,215,246,0.08)]">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
        <div className="text-2xl font-black tracking-tighter text-cyan-400 font-headline uppercase">NEURAL_ARC</div>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm">
          <a className="text-cyan-400 border-b-2 border-cyan-400 pb-1" href="#">Storefront</a>
          <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="#">Visual Search</a>
          <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="#">Vendors</a>
          <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="#">Catalog</a>
          <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="#">Analytics</a>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-90 transition-transform">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-90 transition-transform">
            <span className="material-symbols-outlined">smart_toy</span>
          </button>
          <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden">
            <img alt="User Neural Profile" className="w-full h-full object-cover" data-alt="Cyberpunk style neon portrait avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsVNBaULuFPfT-b7zR-8kRQRAZsNo8hEHp010THI2oU9VyxK9G9GUGKUO-re5UNfwq9Y4A74kgdI3fGy2Ps7BG3pTtBO5MwOKHe_b3GFayJpXUIgR6IE13gmM0kV_831WmB6fJZT2nCDOXnQNfLE_CG5p5kaOZ2-qCs9UOK3qbgQJJIuFsMGzmD-lX8TZcp7Ijj6ZyUgjpZz9iKFxz0fX0VMk7vXlnOz2sEtYd7ZAtI4Ci6AOOLOtgw8PEP8vP8fWmiW6t0Mp6pfW2" />
          </div>
        </div>
      </div>
    </nav>
  );
};
