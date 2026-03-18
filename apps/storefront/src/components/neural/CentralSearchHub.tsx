'use client';

import React from 'react';

export const CentralSearchHub = () => {
  return (
    <div className="col-span-12 lg:col-span-8 row-span-2 glass-panel border border-cyan-500/20 rounded-lg p-12 flex flex-col justify-center items-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
        <span className="material-symbols-outlined text-8xl text-primary relative z-10" style={{ fontVariationSettings: '"FILL" 1' }}>psychology</span>
      </div>
      <h1 className="font-headline text-5xl font-black tracking-tighter text-center mb-6 uppercase max-w-2xl leading-none">
                          Architect Your Reality with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aetheris AI</span>
      </h1>
      <div className="w-full max-w-xl relative mt-4">
        <input className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-full px-8 py-5 text-lg font-body focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-600" placeholder="Search neural assets, datasets, or vendor cores..." type="text"/>
        <button className="absolute right-3 top-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary p-3 rounded-full hover:scale-105 active:scale-95 transition-transform flex items-center justify-center">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <span className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-xs font-label uppercase tracking-widest text-slate-400">#LATENT_SPACE</span>
        <span className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-xs font-label uppercase tracking-widest text-slate-400">#SYNTHETIC_VISUALS</span>
        <span className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-xs font-label uppercase tracking-widest text-slate-400">#CORE_ENGINES</span>
      </div>
    </div>
  );
};
