'use client';

import React from 'react';

export const GlassSidebar = () => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-20 hover:opacity-100 transition-opacity">
      <div className="w-1 h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
      <div className="rotate-90 origin-left whitespace-nowrap text-[10px] font-label tracking-[0.5em] text-cyan-500 uppercase">System Active // Node_042</div>
    </div>
  );
};
