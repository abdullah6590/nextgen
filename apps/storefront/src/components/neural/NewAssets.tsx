'use client';

import React from 'react';

export const NewAssets = () => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-1 bg-surface-container-low rounded-lg p-8 flex flex-col justify-between border border-outline-variant/10 hover-lift">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></div>
        <h2 className="font-headline text-xl font-bold uppercase tracking-tight">New Assets</h2>
      </div>
      <div className="space-y-4 my-6">
        <div className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/5">
          <div className="w-10 h-10 bg-secondary/20 rounded-md flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-sm">model_training</span>
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">Neural Mesh v4.2</p>
            <p className="text-[10px] text-slate-500 uppercase">Vendor: Cypher_Core</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/5">
          <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-sm">filter_vintage</span>
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">Bio-Synth Textures</p>
            <p className="text-[10px] text-slate-500 uppercase">Vendor: Gaia_Labs</p>
          </div>
        </div>
      </div>
      <button className="w-full py-3 bg-surface-container-highest rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">Explore All</button>
    </div>
  );
};
