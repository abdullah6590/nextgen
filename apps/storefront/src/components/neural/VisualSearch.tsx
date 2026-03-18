'use client';

import React from 'react';

export const VisualSearch = () => {
  return (
    <div className="col-span-12 lg:col-span-4 row-span-1 glass-panel border border-cyan-500/20 rounded-lg p-8 flex flex-col justify-between hover-lift group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-primary font-label text-xs tracking-widest uppercase mb-1">Module 01</p>
          <h2 className="font-headline text-2xl font-bold uppercase tracking-tight">Visual Search</h2>
        </div>
        <span className="material-symbols-outlined text-cyan-500/50 group-hover:text-cyan-400 transition-colors">camera_enhance</span>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">Drop any asset to find neural matches across the entire Aetheris network.</p>
      <div className="h-32 rounded-xl border-2 border-dashed border-outline-variant/30 flex items-center justify-center bg-surface-container-lowest group-hover:border-primary/50 transition-colors">
        <span className="text-slate-500 font-label text-xs uppercase tracking-tighter">Initialize Upload Protocol</span>
      </div>
    </div>
  );
};
