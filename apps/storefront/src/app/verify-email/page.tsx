'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email identity...');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided. Protocol aborted.');
      return;
    }

    const verifyToken = async () => {
      try {
        await api.post('/auth/verify-email', { token });
        setStatus('success');
        setMessage('Identity verified. Neural connection established.');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.error || err.response?.data?.message || 'Invalid or expired token.');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-[420px] glass-panel p-10 rounded-[24px] border border-[#3d494c]/20 relative z-10 text-center"
    >
      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(76,215,246,0.1)] border ${
        status === 'loading' ? 'bg-[#1c1b1d] border-[#4cd7f6]/30' :
        status === 'success' ? 'bg-green-500/10 border-green-500/30' :
        'bg-red-500/10 border-red-500/30'
      }`}>
        <span className={`material-symbols-outlined text-4xl ${
          status === 'loading' ? 'text-[#4cd7f6] animate-spin' :
          status === 'success' ? 'text-green-400' :
          'text-red-400'
        }`} style={{ fontVariationSettings: "'FILL' 1" }}>
          {status === 'loading' ? 'autorenew' : status === 'success' ? 'check_circle' : 'error'}
        </span>
      </div>

      <h2 className="text-3xl font-headline font-black uppercase tracking-widest text-white mb-4">
        {status === 'loading' ? 'Verifying...' : status === 'success' ? 'Verified' : 'Verification Failed'}
      </h2>
      
      <p className={`text-sm uppercase tracking-widest font-bold mb-8 ${
        status === 'loading' ? 'text-[#bcc9cd]' :
        status === 'success' ? 'text-green-400' :
        'text-red-400'
      }`}>
        {message}
      </p>

      {status !== 'loading' && (
        <Link href="/login" className="inline-block w-full py-4 rounded-[14px] bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(76,215,246,0.2)] hover:shadow-[0_0_30px_rgba(76,215,246,0.4)]">
          RETURN TO LOGIN
        </Link>
      )}
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="bg-[#131315] text-[#e5e1e4] font-body min-h-screen flex items-center justify-center relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(19, 19, 21, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
      `}} />

      {/* Nav Overlay */}
      <nav className="absolute top-0 w-full z-50 p-8 mix-blend-difference">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#4cd7f6] font-headline uppercase hover:text-white transition-colors">NEURAL_ARC</Link>
      </nav>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <Suspense fallback={<div className="text-[#4cd7f6] font-mono animate-pulse">Initializing Neural Link...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
