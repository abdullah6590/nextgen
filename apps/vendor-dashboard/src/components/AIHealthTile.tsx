'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIHealthTile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-12 glass-panel p-8 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-neonCyan/10 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-neonCyan/20 transition-colors" />
      
      <div className="relative z-10 flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-neonCyan/20 border border-neonCyan/30 flex items-center justify-center shadow-neon-cyan animate-pulse">
          <Sparkles className="w-8 h-8 text-neonCyan" />
        </div>
        
        <div className="flex-1">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-neonCyan mb-1">AI Store Health Insight</div>
          <h2 className="text-xl font-bold mb-1">Your inventory is optimal, but <span className="text-neonCyan italic">'Wireless Earbuds'</span> are trending.</h2>
          <p className="text-textSub text-sm tracking-wide">Consider restocking by <span className="text-white font-bold">15%</span> to meet the holiday surge. AI suggests a limited-time discount on accessories.</p>
        </div>

        <button className="hidden md:block px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase transition-all">
          Analyze Full Data
        </button>
      </div>
    </motion.div>
  );
}
