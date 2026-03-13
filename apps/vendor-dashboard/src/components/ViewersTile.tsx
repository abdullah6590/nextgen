'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ViewersTile() {
  const [viewers, setViewers] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-neonCyan" />
        </div>
        <div className="flex gap-1">
           {[1,2,3].map(i => (
             <motion.div 
               key={i}
               animate={{ height: [8, 16, 8] }}
               transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
               className="w-1 bg-neonCyan rounded-full"
             />
           ))}
        </div>
      </div>

      <div>
        <div className="text-4xl font-mono font-bold tracking-tighter mb-1 select-none">
          {viewers.toLocaleString()}
        </div>
        <p className="text-textSub text-xs font-mono tracking-widest uppercase opacity-60">
          Live Active Viewers
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-textSub">
          <span>KAFKA_STREAMING</span>
          <span className="text-neonCyan animate-pulse">● LIVE</span>
        </div>
      </div>
    </div>
  );
}
