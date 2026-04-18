'use client';

import React, { useState, useRef } from 'react';
import VisualSearchOverlay from '../VisualSearchOverlay';

export const VisualSearch = ({ onResults }: { onResults?: (results: any[]) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setLoading(true);
    
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('http://localhost:8080/visual-search/', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (onResults) onResults(data);
      } else {
        const errText = await res.text();
        console.error(`Failed to search image [${res.status}]:`, errText);
        alert(`Visual Search Error: ${res.statusText}\n${errText}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      URL.revokeObjectURL(url);
      setPreviewUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <div 
        className="col-span-12 lg:col-span-4 row-span-1 glass-panel border border-cyan-500/20 rounded-lg p-8 flex flex-col justify-between hover-lift group relative cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-primary font-label text-xs tracking-widest uppercase mb-1">Module 01</p>
            <h2 className="font-headline text-2xl font-bold uppercase tracking-tight">Visual Search</h2>
          </div>
          <span className="material-symbols-outlined text-cyan-500/50 group-hover:text-cyan-400 transition-colors">camera_enhance</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">Drop any asset to find neural matches across the entire Aetheris network.</p>
        
        <input 
          type="file" 
          accept="image/*" 
          className="absolute w-0 h-0 opacity-0 overflow-hidden" 
          ref={fileInputRef} 
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) handleUpload(e.target.files[0]);
          }} 
        />

        <div 
          className={`h-32 rounded-xl border-2 border-dashed flex items-center justify-center transition-colors ${isDragging ? 'border-cyan-500 bg-cyan-500/10' : 'border-cyan-900/30 bg-black/40 group-hover:border-cyan-500/50'}`}
        >
          <span className="text-cyan-500/70 font-mono text-xs uppercase tracking-widest">
            {loading ? 'Analyzing Neural Patterns...' : 'Initialize Upload Protocol'}
          </span>
        </div>
      </div>
      
      {loading && previewUrl && (
        <VisualSearchOverlay imageUrl={previewUrl} />
      )}
    </>
  );
};
