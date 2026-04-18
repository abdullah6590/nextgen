'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductDeepDivePage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary/30 min-h-screen">
      {/* Top Navigation Anchor */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_8px_32px_0_rgba(76,215,246,0.08)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
          <div className="text-2xl font-black tracking-tighter text-cyan-400 font-headline uppercase">NEURAL_ARC</div>
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm">
            <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="/">Storefront</a>
            <a className="text-cyan-400 border-b-2 border-cyan-400 pb-1" href="/products">Catalog</a>
            <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="/checkout">Checkout</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-cyan-400 transition-all duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="text-slate-400 hover:text-cyan-400 transition-all duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined">smart_toy</span>
            </button>
            <Link href="/profile" className="w-10 h-10 rounded-full border border-cyan-500/20 overflow-hidden bg-surface-container-high hover:border-cyan-400 hover:scale-105 transition-all cursor-pointer block">
              <img alt="User Neural Profile" className="w-full h-full object-cover" data-alt="Cyberpunk style neon portrait of a user profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy1PiqlAxEKDb59OF_RW385I9g3Ebmj7gFIoZJIfaeh7y735x5UTQmPwpEUK5aLODyDzLNAHL--M4Z37T2T7QCTrrigc_eKvICV_ArCt63fwTjCTwgJ4gANtZhN5nCaB3Z7lUGyDu3uRDXJtCkPxK2S5ceVZBj0vRiZtNMC_E7kCFdeQ1PIbAgugdQI1Ww5woCM0RfTTIUqUa9YMYTN1qP9LaU6GWkvYSq-QPtvwmLHxnJpBcEpvwSS39vdU6m0ssr1qxP_29Xexdl" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-24 pb-12 px-8 min-h-screen grid grid-cols-12 gap-8 max-w-[1920px] mx-auto relative overflow-hidden">
        
        {/* Left Section: 3D Asset Preview */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[819px] bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/10 group">
            <img alt="Aetheris AI Asset" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]" data-alt="High resolution 3D abstract digital sculpture with flowing particles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnHt7L0-cjAzxH9tNsDGNj9wRDtAS1lFmZd-5er56LZ4z1gAFRaI56PI2FitFkk3wuwLg75QXFCfqdc2TAZY6kk1oMUO0GtyXf37kSJFViV0FVNMOBp-13DjQ7f2YRW5RPd-5fAjw8V5hDC0cFS9WnCQ-pRD1d23LCxFb-yE4s1w2ygAm9yC2SzijDcX4e6Zkml8T-l8JnMyBIl7PefLRrADu8Li7Otyt3u6tFP67uwZljn2VH3F_wVo7-0BADLXzEL2PFdjfMHbkG" />
            
            {/* Asset Overlay Info */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-[pulse_2s_infinite]"></span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Live Neural Render</span>
              </div>
              <h1 className="text-6xl font-black font-headline tracking-tighter text-white uppercase leading-none">Aetheris AI</h1>
              <p className="text-on-surface-variant font-medium tracking-wide">Series v.4 // Genesis Core Architecture</p>
            </div>
            
            {/* Floating Interaction Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-80 h-80 border border-secondary/10 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
            </div>
          </div>
        </section>

        {/* Middle Section: Product Details & Metrics */}
        <section className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          
          {/* Kafka Synced Inventory Card */}
          <div className="glass-panel backdrop-blur-[20px] bg-[rgba(19,19,21,0.15)] p-6 rounded-lg border border-outline-variant/20 shadow-[0_0_15px_rgba(208,188,255,0.1)]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Stock Status</p>
                <h3 className="text-xl font-headline font-bold text-white uppercase">Real-Time Sync</h3>
              </div>
              <span className="material-symbols-outlined text-secondary">database</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-headline font-bold text-primary">14</span>
              <span className="text-on-surface-variant text-sm pb-1">Units available in local node</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-[14%] rounded-full shadow-[0_0_10px_#4cd7f6]"></div>
            </div>
            <p className="mt-3 text-[10px] text-on-surface-variant italic">Kafka cluster: us-east-1a-prod // Latency: 4ms</p>
          </div>

          {/* Deep Dive Specs Bento */}
          <div className="flex flex-col gap-4">
            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/10 hover:border-primary/40 transition-all cursor-default group">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">memory</span>
                </div>
                <span className="font-headline font-bold tracking-tight text-lg uppercase">Core Processing</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">Liquid-cooled quantum lattice processing unit with 4.2 Exaflops of native AI throughput.</p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/10 hover:border-secondary/40 transition-all cursor-default group">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-md bg-secondary/10 text-secondary">
                  <span className="material-symbols-outlined">shield_moon</span>
                </div>
                <span className="font-headline font-bold tracking-tight text-lg uppercase">Neural Shield</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">Integrated biometric encryption using decentralized blockchain verification layers.</p>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="mt-auto flex flex-col gap-4">
            {/* High-End Commerce Actions */}
            <button className="w-full py-5 rounded-full bg-primary text-on-primary font-headline font-black uppercase tracking-[0.2em] transform hover:scale-[1.05] active:scale-95 transition-all duration-300 animate-[pulse-cyan_3s_infinite_ease-in-out] flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(76,215,246,0.4),0_0_30px_rgba(76,215,246,0.2)]">
              <span className="material-symbols-outlined">shopping_cart</span>
              ADD TO CART
            </button>
            <button className="w-full py-5 rounded-full bg-secondary text-on-secondary font-headline font-black uppercase tracking-[0.2em] transform hover:scale-[1.05] active:scale-95 transition-all duration-300 animate-[pulse-violet_3s_infinite_ease-in-out] flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(208,188,255,0.4),0_0_30px_rgba(208,188,255,0.2)]">
              <span className="material-symbols-outlined">payments</span>
              PURCHASE NOW
            </button>
            <button className="w-full py-3 mt-2 rounded-full backdrop-blur-[20px] bg-[rgba(19,19,21,0.15)] border border-primary/20 text-primary/60 font-headline font-bold uppercase tracking-[0.1em] hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-xs">
              <span className="material-symbols-outlined text-sm">analytics</span>
              AI Analysis Report
            </button>
          </div>
        </section>

        {/* Right Section: AI Stylist Sidebar */}
        <section className="col-span-12 lg:col-span-3 flex flex-col bg-surface-container-lowest/50 backdrop-blur-md rounded-lg border border-outline-variant/10 overflow-hidden shadow-[0_0_15px_rgba(208,188,255,0.1)] h-[819px] sticky top-24">
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-outline-variant/10 flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>psychology</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface"></div>
            </div>
            <div>
              <h4 className="font-headline font-bold text-white uppercase tracking-tight">AI Stylist</h4>
              <p className="text-[10px] text-tertiary font-bold tracking-widest uppercase">Consultant Online</p>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* AI Message */}
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-secondary-container/20 p-4 rounded-lg rounded-tl-none border border-secondary/20">
                <p className="text-sm text-on-secondary-container leading-relaxed">Greetings, Architect. The Aetheris AI module perfectly complements your existing <span className="text-secondary font-bold">Obsidian Core</span> workflow. Shall I simulate the integration?</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">09:41 AM</span>
            </div>

            {/* User Message */}
            <div className="flex flex-col gap-2 max-w-[85%] ml-auto items-end">
              <div className="bg-surface-container-highest p-4 rounded-lg rounded-tr-none border border-outline-variant/20">
                <p className="text-sm text-white leading-relaxed">What&apos;s the latency impact on visual search tasks?</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">09:42 AM</span>
            </div>

            {/* AI Message */}
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-secondary-container/20 p-4 rounded-lg rounded-tl-none border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span className="text-[10px] uppercase font-bold text-secondary">AI Calculation Complete</span>
                </div>
                <p className="text-sm text-on-secondary-container leading-relaxed">Predicted latency reduction is <span className="text-primary font-bold">22.4%</span> due to the Genesis Core&apos;s dedicated vector sub-processor.</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">09:42 AM</span>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-6 bg-surface-container-low border-t border-outline-variant/10">
            <div className="relative">
              <input className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-secondary transition-all placeholder:text-slate-600" placeholder="Consult the AI Architect..." type="text" />
              <button className="absolute right-2 top-1.5 w-9 h-9 bg-secondary rounded-full text-on-secondary flex items-center justify-center hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-12 px-8 mt-auto bg-[#0e0e10] border-t border-cyan-500/10 flex flex-col items-center gap-6">
        <div className="flex gap-12 text-slate-600 font-body text-[10px] tracking-widest uppercase">
          <a className="hover:text-violet-400 transition-colors" href="#">Privacy Protocol</a>
          <a className="hover:text-violet-400 transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-violet-400 transition-colors" href="#">API Docs</a>
          <a className="hover:text-violet-400 transition-colors" href="#">Neural Network Status</a>
        </div>
        <p className="text-slate-600 font-body text-[10px] tracking-widest uppercase">© 2024 NEURAL ARCHITECT. ALL ASSETS RENDERED IN 8K.</p>
      </footer>
    </div>
  );
}
