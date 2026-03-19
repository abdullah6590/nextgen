'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', { email, password, role: 'customer' });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Neural link aborted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#131315] text-[#e5e1e4] font-body selection:bg-[#d0bcff]/30 min-h-screen flex flex-row-reverse relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(19, 19, 21, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .neon-glow-violet { box-shadow: 0 0 40px rgba(208, 188, 255, 0.05), inset 0 0 20px rgba(208, 188, 255, 0.02); }
        .cyber-input { background: #0e0e10; border: 1px solid rgba(61, 73, 76, 0.3); color: white; transition: all 0.3s; }
        .cyber-input:focus { outline: none; border-color: #d0bcff; box-shadow: 0 0 15px rgba(208, 188, 255, 0.2); }
      `}} />

      {/* Nav Overlay */}
      <nav className="absolute top-0 w-full z-50 p-8 mix-blend-difference pointer-events-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#d0bcff] font-headline uppercase hover:text-white transition-colors">NEURAL_ARC</Link>
      </nav>

      {/* Right Hemisphere (reversed because of flex-row-reverse): Visual Context */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0e0e10] border-l border-[#3d494c]/30">
        <motion.img 
          initial={{ scale: 1.1, x: 20 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          alt="Neural Core Initialization" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnHt7L0-cjAzxH9tNsDGNj9wRDtAS1lFmZd-5er56LZ4z1gAFRaI56PI2FitFkk3wuwLg75QXFCfqdc2TAZY6kk1oMUO0GtyXf37kSJFViV0FVNMOBp-13DjQ7f2YRW5RPd-5fAjw8V5hDC0cFS9WnCQ-pRD1d23LCxFb-yE4s1w2ygAm9yC2SzijDcX4e6Zkml8T-l8JnMyBIl7PefLRrADu8Li7Otyt3u6tFP67uwZljn2VH3F_wVo7-0BADLXzEL2PFdjfMHbkG" 
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#131315]/40 to-[#131315]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-20 pointer-events-none">
          <div className="w-[800px] h-[800px] border-[1px] border-[#d0bcff] rounded-full animate-[spin_60s_linear_infinite_reverse] border-dashed"></div>
        </div>

        <div className="absolute bottom-16 right-16 flex flex-col items-end gap-6 z-10 text-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#131315]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#d0bcff]/20 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#d0bcff] animate-[pulse_1.5s_ease-in-out_infinite]"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d0bcff]">Connection Initializer</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-black font-headline tracking-tighter text-white uppercase leading-[0.9] max-w-xl"
          >
            ESTABLISH<br/>UPLINK
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#bcc9cd] text-sm font-medium tracking-wide border-r-[3px] border-[#d0bcff] pr-6 py-2 mt-4 bg-gradient-to-l from-[#131315]/80 to-transparent max-w-sm"
          >
            Awaiting new neural signature.<br/>
            Security protocol: <span className="text-[#d0bcff] font-mono font-bold">WPA3-Mesh</span>
          </motion.p>
        </div>
      </div>

      {/* Left Hemisphere: Interactive Terminal */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-8 relative z-10 bg-[#131315]">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#d0bcff] rounded-full blur-[150px] opacity-[0.04] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] bg-[#4cd7f6] rounded-full blur-[120px] opacity-[0.03] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px] glass-panel p-10 rounded-[24px] border border-[#3d494c]/20 neon-glow-violet relative"
        >
          {/* Subtle grid pattern background inside the card */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[24px]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1b1d] border border-[#d0bcff]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(208,188,255,0.15)] group hover:scale-105 transition-transform cursor-default">
               <span className="material-symbols-outlined text-[#d0bcff] text-3xl group-hover:rotate-12 transition-transform duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>add_card</span>
            </div>
            <h2 className="text-3xl font-headline font-black uppercase tracking-widest text-white text-center">New Pattern<br/>Creation</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-xs uppercase tracking-widest px-4 py-3 rounded-[12px] text-center font-bold">
                {error}
              </motion.div>
            )}
            
            <div className="space-y-2 group">
              <label className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#d0bcff] transition-colors">Target Node Identity</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#d0bcff]/50 text-sm group-focus-within:text-[#d0bcff]">tag</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="new_user@neural-arc.net"
                  className="w-full cyber-input pt-4 pb-3 pl-11 pr-4 rounded-[14px] text-sm placeholder:text-[#3d494c]/80"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2 group">
              <label className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#d0bcff] transition-colors">Authorization Sequence</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#d0bcff]/50 text-sm group-focus-within:text-[#d0bcff]">enhanced_encryption</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set strong sequence"
                  className="w-full cyber-input pt-4 pb-3 pl-11 pr-4 rounded-[14px] text-[18px] tracking-[0.2em] placeholder:text-[#3d494c]/80"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 mt-6 rounded-[14px] bg-[#d0bcff] text-[#3c0091] font-headline font-black uppercase tracking-[0.2em] scale-100 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(208,188,255,0.2)] hover:shadow-[0_0_30px_rgba(208,188,255,0.4)] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3">
              {loading ? (
                <><span className="material-symbols-outlined animate-spin text-sm">settings</span> SYNCING NODE</>
              ) : (
                <><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span> ESTABLISH UPLINK</>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#3d494c]/20 text-center relative z-10">
            <p className="text-[11px] text-[#bcc9cd] uppercase tracking-widest">
              Existing network entity?  <br className="md:hidden" />
              <Link href="/login" className="text-[#d0bcff] hover:text-white transition-colors font-bold ml-1 underline underline-offset-4 decoration-[#d0bcff]/30 hover:decoration-[#d0bcff]">
                Authenticate Now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
