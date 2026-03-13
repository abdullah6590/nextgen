'use client';

import { UploadCloud } from 'lucide-react';

export function AddProductTile() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold tracking-tight mb-1">Quick Action</h3>
        <p className="text-textSub text-xs">Instantly expand your store inventory.</p>
      </div>

      <div className="flex-grow group cursor-pointer">
        <div className="h-full border-2 border-dashed border-white/10 group-hover:border-neonCyan/50 group-hover:bg-neonCyan/5 rounded-3xl flex flex-col items-center justify-center p-6 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-neonCyan/20 transition-all">
            <UploadCloud className="w-6 h-6 text-textSub group-hover:text-neonCyan" />
          </div>
          <p className="text-sm font-medium text-center mb-1">Add New Product</p>
          <p className="text-[10px] text-textSub text-center opacity-60 px-4 leading-relaxed">
            Drop product image. AI will auto-generate tags and descriptions.
          </p>
        </div>
      </div>
    </div>
  );
}
