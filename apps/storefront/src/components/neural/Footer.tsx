'use client';

import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-8 mt-auto bg-[#0e0e10] border-t border-cyan-500/10 flex flex-col items-center gap-6">
      <div className="flex gap-12 flex-wrap justify-center font-body text-[10px] tracking-widest uppercase text-slate-600">
        <a className="hover:text-violet-400 transition-colors" href="#">Privacy Protocol</a>
        <a className="hover:text-violet-400 transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-violet-400 transition-colors" href="#">API Docs</a>
        <a className="hover:text-violet-400 transition-colors" href="#">Neural Network Status</a>
      </div>
      <p className="text-cyan-500 font-label text-[10px] tracking-widest uppercase text-center">
        © 2024 NEURAL ARCHITECT. ALL ASSETS RENDERED IN 8K.
      </p>
    </footer>
  );
};
