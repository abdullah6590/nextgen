'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import VisualSearchOverlay from '../components/VisualSearchOverlay';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function StorefrontHomePage() {
  const [showVisualSearch, setShowVisualSearch] = useState(false);
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_8px_32px_0_rgba(76,215,246,0.08)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
          <div className="text-2xl font-black tracking-tighter text-cyan-400 font-headline uppercase">NEURAL_ARC</div>
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm">
            <a className="text-cyan-400 border-b-2 border-cyan-400 pb-1" href="/">Storefront</a>
            <button className="text-slate-400 hover:text-cyan-200 transition-colors font-headline tracking-tight uppercase text-sm uppercase" onClick={() => setShowVisualSearch(true)}>Visual Search</button>
            <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="/products">Catalog</a>
            <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="/checkout">Checkout</a>
            <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="#">Vendors</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-90 transition-transform">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 active:scale-90 transition-transform">
              <span className="material-symbols-outlined">smart_toy</span>
            </button>
            <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden">
              <img alt="User Neural Profile" className="w-full h-full object-cover" data-alt="Cyberpunk style neon portrait avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsVNBaULuFPfT-b7zR-8kRQRAZsNo8hEHp010THI2oU9VyxK9G9GUGKUO-re5UNfwq9Y4A74kgdI3fGy2Ps7BG3pTtBO5MwOKHe_b3GFayJpXUIgR6IE13gmM0kV_831WmB6fJZT2nCDOXnQNfLE_CG5p5kaOZ2-qCs9UOK3qbgQJJIuFsMGzmD-lX8TZcp7Ijj6ZyUgjpZz9iKFxz0fX0VMk7vXlnOz2sEtYd7ZAtI4Ci6AOOLOtgw8PEP8vP8fWmiW6t0Mp6pfW2" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-32 pb-24 px-8 max-w-[1920px] mx-auto">
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-12 gap-6 auto-rows-auto">
          {/* Central Neural Search Hub */}
          <motion.div variants={item} className="col-span-12 lg:col-span-8 row-span-2 glass-panel border border-cyan-500/20 rounded-lg p-12 flex flex-col justify-center items-center relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] bg-[rgba(19,19,21,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
              <span className="material-symbols-outlined text-8xl text-primary relative z-10" style={{ fontVariationSettings: '"FILL" 1' }}>psychology</span>
            </div>
            <h1 className="font-headline text-5xl font-black tracking-tighter text-center mb-6 uppercase max-w-2xl leading-none">
              Architect Your Reality with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aetheris AI</span>
            </h1>
            <div className="w-full max-w-xl relative mt-4">
              <input className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-full px-8 py-5 text-lg font-body focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-600" placeholder="Search neural assets, datasets, or vendor cores..." type="text" />
              <button className="absolute right-3 top-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary p-3 rounded-full hover:scale-105 active:scale-95 transition-transform flex items-center justify-center">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
            <div className="flex gap-4 mt-8 flex-wrap justify-center">
              <span className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-xs font-label uppercase tracking-widest text-slate-400">#LATENT_SPACE</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-xs font-label uppercase tracking-widest text-slate-400">#SYNTHETIC_VISUALS</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-xs font-label uppercase tracking-widest text-slate-400">#CORE_ENGINES</span>
            </div>
          </motion.div>

          {/* Visual Search (Side Tile) */}
          <motion.div variants={item} className="col-span-12 lg:col-span-4 row-span-1 bg-[rgba(19,19,21,0.15)] backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-cyan-500/20 rounded-lg p-8 flex flex-col justify-between hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(76,215,246,0.1)] transition-all duration-300 group">
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
          </motion.div>

          {/* New Assets Status (Side Tile) */}
          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-4 row-span-1 bg-surface-container-low rounded-lg p-8 flex flex-col justify-between border border-outline-variant/10 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(76,215,246,0.1)] transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></div>
              <h2 className="font-headline text-xl font-bold uppercase tracking-tight">New Assets</h2>
            </div>
            <div className="space-y-4 my-6">
              <Link href="/product/neural-mesh-v4-2" className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/5 hover:border-secondary/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-secondary/20 rounded-md flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-sm">model_training</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface group-hover:text-secondary transition-colors">Neural Mesh v4.2</p>
                  <p className="text-[10px] text-slate-500 uppercase">Vendor: Cypher_Core</p>
                </div>
              </Link>
              <Link href="/product/bio-synth-textures" className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/5 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <span className="material-symbols-outlined text-primary text-sm">filter_vintage</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">Bio-Synth Textures</p>
                  <p className="text-[10px] text-slate-500 uppercase">Vendor: Gaia_Labs</p>
                </div>
              </Link>
            </div>
            <button className="w-full py-3 bg-surface-container-highest rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">Explore All</button>
          </motion.div>

          {/* Popular Vendors (Wide Tile) */}
          <motion.div variants={item} className="col-span-12 lg:col-span-6 row-span-1 bg-[rgba(19,19,21,0.15)] backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-cyan-500/20 rounded-lg p-8 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(76,215,246,0.1)] transition-all duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-headline text-2xl font-bold uppercase tracking-tight">Popular Vendors</h2>
              <span className="text-xs text-primary font-label tracking-widest uppercase">Verified Nodes</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-primary transition-colors">
                  <img alt="Vendor Alpha" className="w-full h-full object-cover rounded-full" data-alt="Futuristic high-tech server logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4oqXR1-rWA-aTF0r14DXwq_MvPpWg-97O5PfOAFrA6QMjxk_6xHcXK9331tprtIM_qvR9-TKUjGULEG_iCvzuRlGl7H2bzYvrmlkBRlIYjXsRL7jYGiwuFL7-iPnBculjTTo0RRgheAxfUiHXcAs0phlQT7A3zQnTAKeqJe9V6tZ8-EJHrQNzxv6DwTK1ZHlJSxPbURFQG3foST2cV3urHTTyMRF35zfJYBT-ROb8iau-GLdOrYCJBKSh2cYELvM7sokbWAXvtdIH" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">AETHER_X</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-secondary transition-colors">
                  <img alt="Vendor Beta" className="w-full h-full object-cover rounded-full" data-alt="Abstract purple neural network logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPSCqbTBGrB0O78tr5qZNmtZwHV7z4DFhwzS-eYb02UCdxiKSIF1AId4HQ6CcQHl5tyS45iMQRfPV7ApCukG6amrvOwoftKah87r4hPNWqJQduz6Z5k_mOuMeq64HKs0UABt2MufvZ6DVcPgP9k9yMfYiXYgEgM2gTzMJCrDmQ3OJNU2fDxp4kO_mqcLlAyVFI2oMQV2LaOC9d3z41av2SX05D0yJIEQzoG3QY92AqXWgkRq-qROvqOIrwfJYiLJYVqvkylQcd2lrF" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">NEXUS_MOD</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-tertiary transition-colors">
                  <img alt="Vendor Gamma" className="w-full h-full object-cover rounded-full" data-alt="Minimalist orange technological symbol" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwmReEKjcpM9HPlN8ct6teX9tOLcNNfOUl3M1giCOWilk8CdqN187cIwjHgVCYcSXyUyBEcki5C8hSiw7_sDiQDvNlh9xwti7M-pxN_cKBmi5GMJAQblybnwDsVLwTzqaJrp3lEGzkC0uqcs0qYwzMQNwBGxvckvsIQnTQPPhvc88Ci0v5PCsBBwhrq2Y_whsmMe3Hxi1WmCDWKbCMISfHcPK2Y8ZlGapqEvMiExafkCVf1FbGgrz04gg5RS8znyHmu1CVdgSMS6H8" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">VOID_DEV</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-outline-variant/20 p-1 group-hover:border-primary transition-colors">
                  <img alt="Vendor Delta" className="w-full h-full object-cover rounded-full" data-alt="Blue digital globe representation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdYg3MLCZzaEhLC9vGyi-A0jJah_1MXja3CP6WOebzBr6lOMg-uq4z0GoYPP3_YhPFYSENh4uadYTV9oIpwJrW2uAGF_2hNNnVCfKF1dXQPlIJF2y0jMibn8wCqFLJAaiDj_Wp_5yi24LneCWyzVR3XM3vV31B8YHfKEBcr9scJ5dd98OzbfZt0WyobW_1y2-hub2jCEwxuNRMHnA-K0WyKULBJa362JWVmcmYFSE0QhEQxpQWClxEMv6lSL7h8vDYOhj6TGGIDu0l" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">ORBIT_CORE</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Product 1 */}
          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-3 row-span-1 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(76,215,246,0.1)] transition-all duration-300 group">
            <Link href="/product/iridescent-mesh-kit" className="block w-full h-full cursor-pointer">
              <div className="h-48 relative">
                <img alt="Neural Asset 1" className="w-full h-full object-cover" data-alt="Abstract iridescent fluid digital art" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0kL0OVc4DTI5hZ1_sYW3t4MxQrpudSwaD79qPf8w16b0gibEsdps4OaLyZEFW2eG5PjkjOjjAU8hKCvhFPo9lC77gQzEg0jOeKEFUuR3oUe7NASDiKZgRhcVU5q1TH2tgcbVU1kf_CayrCWEwEWxaXLOVpchGKMGhnC5kiiubSfvqi6GpMlHymLu9ufHq1FJVW5ewSBGsqoANc7DTaaLEx_eoyQCqDc1Kan0i87b9bc0lNfn6mrgBymgvaQzcRw62UqS_PgEjr5Zm" />
                <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-black px-2 py-1 rounded-sm shadow-lg">99.4% MATCH</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-none group-hover:text-primary transition-colors">Iridescent Mesh Kit</h3>
                  <span className="text-primary font-bold">2.4 ETH</span>
                </div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Procedural Materials</p>
                <div className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 rounded-full text-xs font-bold uppercase tracking-widest group-hover:shadow-[0_0_15px_rgba(76,215,246,0.4)] transition-all flex justify-center items-center">Acquire Asset</div>
              </div>
            </Link>
          </motion.div>

          {/* Featured Product 2 */}
          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-3 row-span-1 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(76,215,246,0.1)] transition-all duration-300 group">
            <Link href="/product/neo-tokyo-enviro" className="block w-full h-full cursor-pointer">
              <div className="h-48 relative">
                <img alt="Neural Asset 2" className="w-full h-full object-cover" data-alt="Dark futuristic architecture interior with neon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnUssltF04v92j3XMPmRKSqs8u_bDolyYBBWuEXCfTkbIjHbSZKO8Gn7b3Of6GJVFTyo6sdIHOW_Y9FFLg5AENvJP3LHFSQ-iYF4l_JHDG9ERYmQEauipMqEjTBiIaklARI1lTRkwmfBp-FgJ6X6ai4QTQ2Xv09hApC6T9tujWSfvLtXPBc-ewuLdib9n8zI8FcTRzs_mxQ3IItWzbP2HvQALEbqwO095-ii94G-b1ExTlKQeyCuyRiQyMmIqUOjydrjpLqpW1nZLM" />
                <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-black px-2 py-1 rounded-sm shadow-lg">98.1% MATCH</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-none group-hover:text-primary transition-colors">Neo-Tokyo Enviro</h3>
                  <span className="text-primary font-bold">4.8 ETH</span>
                </div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Real-time Scene Core</p>
                <div className="flex flex-col gap-3">
                  <div className="w-full py-3 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] font-bold text-[10px] uppercase tracking-widest hover:bg-[#06b6d4]/20 transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-sm flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    ADD TO CART
                  </div>
                  <div className="w-full py-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-[0_0_25px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
                    QUICK PURCHASE
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer Shell */}
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

      {/* Side Decoration (Spatial Indicator) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-20 hover:opacity-100 transition-opacity">
        <div className="w-1 h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        <div className="rotate-90 origin-left whitespace-nowrap text-[10px] font-label tracking-[0.5em] text-cyan-500 uppercase">System Active // Node_042</div>
      </div>
      {showVisualSearch && (
        <VisualSearchOverlay onClose={() => setShowVisualSearch(false)} />
      )}
    </div>
  );
}
