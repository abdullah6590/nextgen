'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  // 2FA state
  const [needs2FA, setNeeds2FA] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [totpCode, setTotpCode] = useState('');

  const [needsVerification, setNeedsVerification] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleResendVerification = async () => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await api.post('/auth/send-verification', { email });
      setSuccessMsg('Verification email sent successfully.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to resend verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setNeedsVerification(false);
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });

      // Check if 2FA is required
      if (response.data.requires2FA) {
        setNeeds2FA(true);
        setTempToken(response.data.tempToken);
      } else {
        login(response.data.token);
        router.push('/');
      }
    } catch (err: any) {
      if (err.response?.data?.code === 'EMAIL_NOT_VERIFIED') {
        setNeedsVerification(true);
      }
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to authenticate. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login-2fa', {
        tempToken,
        token: totpCode,
      });
      login(response.data.accessToken);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#131315] text-[#e5e1e4] font-body selection:bg-[#4cd7f6]/30 min-h-screen flex relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(19, 19, 21, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .neon-glow-cyan { box-shadow: 0 0 40px rgba(76, 215, 246, 0.05), inset 0 0 20px rgba(76, 215, 246, 0.02); }
        .cyber-input { background: #0e0e10; border: 1px solid rgba(61, 73, 76, 0.3); color: white; transition: all 0.3s; }
        .cyber-input:focus { outline: none; border-color: #4cd7f6; box-shadow: 0 0 15px rgba(76, 215, 246, 0.2); }
      `}} />

      {/* Nav Overlay */}
      <nav className="absolute top-0 w-full z-50 p-8 mix-blend-difference">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#4cd7f6] font-headline uppercase hover:text-white transition-colors">NEURAL_ARC</Link>
      </nav>

      {/* Left Hemisphere: Visual Context */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0e0e10] border-r border-[#3d494c]/30">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          alt="Neural Cyber Access" 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnUssltF04v92j3XMPmRKSqs8u_bDolyYBBWuEXCfTkbIjHbSZKO8Gn7b3Of6GJVFTyo6sdIHOW_Y9FFLg5AENvJP3LHFSQ-iYF4l_JHDG9ERYmQEauipMqEjTBiIaklARI1lTRkwmfBp-FgJ6X6ai4QTQ2Xv09hApC6T9tujWSfvLtXPBc-ewuLdib9n8zI8FcTRzs_mxQ3IItWzbP2HvQALEbqwO095-ii94G-b1ExTlKQeyCuyRiQyMmIqUOjydrjpLqpW1nZLM" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#131315]/40 to-[#131315]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-20 pointer-events-none">
          <div className="w-[800px] h-[800px] border-[1px] border-[#4cd7f6] rounded-full animate-[spin_40s_linear_infinite] border-dashed"></div>
        </div>

        <div className="absolute bottom-16 left-16 flex flex-col gap-6 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#131315]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#4cd7f6]/20 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-[pulse_1.5s_ease-in-out_infinite]"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#4cd7f6]">Secure Node Active</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-black font-headline tracking-tighter text-white uppercase leading-[0.9] max-w-xl"
          >
            SYSTEM<br/>OVERRIDE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#bcc9cd] text-sm font-medium tracking-wide border-l-[3px] border-[#4cd7f6] pl-6 py-2 mt-4 bg-gradient-to-r from-[#131315]/80 to-transparent max-w-sm"
          >
            Global verification pool running.<br/>
            Latency: <span className="text-[#4cd7f6] font-mono font-bold">12ms</span> | Sync: <span className="text-[#4cd7f6] font-mono font-bold">Absolute</span>
          </motion.p>
        </div>
      </div>

      {/* Right Hemisphere: Interactive Terminal */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-8 relative z-10 bg-[#131315]">
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-[#d0bcff] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#4cd7f6] rounded-full blur-[120px] opacity-[0.04] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px] glass-panel p-10 rounded-[24px] border border-[#3d494c]/20 neon-glow-cyan relative"
        >
          {/* Subtle grid pattern background inside the card */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[24px]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1b1d] border border-[#4cd7f6]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(76,215,246,0.15)] group hover:scale-105 transition-transform cursor-default">
               <span className="material-symbols-outlined text-[#4cd7f6] text-3xl group-hover:rotate-12 transition-transform duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                 {needs2FA ? 'security' : 'fingerprint'}
               </span>
            </div>
            <h2 className="text-3xl font-headline font-black uppercase tracking-widest text-white text-center">
              {needs2FA ? (<>Two-Factor<br/>Authentication</>) : (<>Identity<br/>Verification</>)}
            </h2>
            {needs2FA && (
              <p className="text-[10px] text-[#bcc9cd] uppercase tracking-widest mt-3">Enter the code from your authenticator app</p>
            )}
          </div>

          {!needs2FA ? (
            /* Standard Login Form */
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-xs uppercase tracking-widest px-4 py-3 rounded-[12px] text-center font-bold">
                  {error}
                  {needsVerification && (
                    <button 
                      type="button" 
                      onClick={handleResendVerification}
                      className="block w-full mt-3 py-2 bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444] rounded-[8px] transition-colors font-headline"
                    >
                      RESEND VERIFICATION EMAIL
                    </button>
                  )}
                </motion.div>
              )}
              {successMsg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs uppercase tracking-widest px-4 py-3 rounded-[12px] text-center font-bold">
                  {successMsg}
                </motion.div>
              )}
              
              <div className="space-y-2 group">
                <label className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#4cd7f6] transition-colors">Secure Identifier Node</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#4cd7f6]/50 text-sm group-focus-within:text-[#4cd7f6]">alternate_email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@neural-arc.net"
                    className="w-full cyber-input pt-4 pb-3 pl-11 pr-4 rounded-[14px] text-sm placeholder:text-[#3d494c]/80"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2 group">
                <label className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#4cd7f6] transition-colors">Encryption Key Sequence</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#4cd7f6]/50 text-sm group-focus-within:text-[#4cd7f6]">key</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full cyber-input pt-4 pb-3 pl-11 pr-4 rounded-[14px] text-[18px] tracking-[0.2em] placeholder:text-[#3d494c]/80"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 mt-6 rounded-[14px] bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.2em] scale-100 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(76,215,246,0.2)] hover:shadow-[0_0_30px_rgba(76,215,246,0.4)] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3">
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin text-sm">rotate_right</span> OVERRIDING</>
                ) : (
                  <><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span> INITIATE OVERRIDE</>
                )}
              </button>
            </form>
          ) : (
            /* 2FA Verification Form */
            <form onSubmit={handle2FASubmit} className="space-y-6 relative z-10">
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-xs uppercase tracking-widest px-4 py-3 rounded-[12px] text-center font-bold">
                  {error}
                </motion.div>
              )}

              <div className="space-y-2 group">
                <label className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#4cd7f6] transition-colors">TOTP Verification Code</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#4cd7f6]/50 text-sm group-focus-within:text-[#4cd7f6]">pin</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full cyber-input pt-4 pb-3 pl-11 pr-4 rounded-[14px] text-[24px] tracking-[0.4em] text-center font-mono placeholder:text-[#3d494c]/80"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" disabled={loading || totpCode.length !== 6} className="w-full py-4 mt-6 rounded-[14px] bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.2em] scale-100 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(76,215,246,0.2)] hover:shadow-[0_0_30px_rgba(76,215,246,0.4)] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3">
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin text-sm">rotate_right</span> VERIFYING</>
                ) : (
                  <><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span> VERIFY IDENTITY</>
                )}
              </button>

              <button
                type="button"
                onClick={() => { setNeeds2FA(false); setTotpCode(''); setTempToken(''); setError(''); }}
                className="w-full py-3 text-[10px] text-[#bcc9cd] uppercase tracking-widest hover:text-[#4cd7f6] transition-colors"
              >
                ← Back to login
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-[#3d494c]/20 text-center relative z-10">
            <p className="text-[11px] text-[#bcc9cd] uppercase tracking-widest">
              Unidentified entity?  <br className="md:hidden" />
              <Link href="/register" className="text-[#4cd7f6] hover:text-white transition-colors font-bold ml-1 underline underline-offset-4 decoration-[#4cd7f6]/30 hover:decoration-[#4cd7f6]">
                Request Protocol
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
