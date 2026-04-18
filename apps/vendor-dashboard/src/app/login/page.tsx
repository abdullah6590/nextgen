'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVendorAuth } from '../../lib/VendorAuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080';

export default function VendorLoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useVendorAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_GATEWAY_URL}/auth/login`, { email, password });

      if (data.requires2FA) {
        setError('2FA is enabled — vendor 2FA support coming soon.');
        return;
      }

      // Decode token to verify role
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      if (payload.role !== 'vendor') {
        setError('Access denied. This portal is for vendor accounts only.');
        return;
      }

      login(data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API_GATEWAY_URL}/auth/register`, {
        email,
        password,
        role: 'vendor',
      });

      // Auto-login after registration
      const { data } = await axios.post(`${API_GATEWAY_URL}/auth/login`, { email, password });
      login(data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#09090b] text-[#e5e1e4] font-body min-h-screen flex relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel { background: rgba(14, 14, 16, 0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
        .cyber-input { background: #0e0e10; border: 1px solid rgba(61, 73, 76, 0.3); color: white; transition: all 0.3s; }
        .cyber-input:focus { outline: none; border-color: #d0bcff; box-shadow: 0 0 20px rgba(208, 188, 255, 0.15); }
      `}} />

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0e0e10] border-r border-[#d0bcff]/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#571bc1]/20 via-transparent to-[#4cd7f6]/10"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-[600px] h-[600px] border border-[#d0bcff]/30 rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[400px] h-[400px] border border-[#4cd7f6]/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
        </div>

        <div className="absolute bottom-16 left-16 flex flex-col gap-6 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#131315]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#d0bcff]/20 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#d0bcff] animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d0bcff]">Vendor Portal v2.0</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-black font-headline tracking-tighter text-white uppercase leading-[0.9] max-w-xl"
          >
            VENDOR<br/>COMMAND
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#bcc9cd] text-sm font-medium tracking-wide border-l-[3px] border-[#d0bcff] pl-6 py-2 mt-4 bg-gradient-to-r from-[#131315]/80 to-transparent max-w-sm"
          >
            Real-time inventory management.<br/>
            AI-powered analytics. Complete control.
          </motion.p>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-8 relative z-10">
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-[#d0bcff] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px] glass-panel p-10 rounded-[24px] border border-[#3d494c]/20 relative"
          style={{ boxShadow: '0 0 40px rgba(208, 188, 255, 0.05), inset 0 0 20px rgba(208, 188, 255, 0.02)' }}
        >
          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1b1d] border border-[#d0bcff]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(208,188,255,0.15)]">
              <span className="material-symbols-outlined text-[#d0bcff] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                storefront
              </span>
            </div>
            <h2 className="text-3xl font-headline font-black uppercase tracking-widest text-white text-center">
              {isRegister ? (<>Vendor<br/>Registration</>) : (<>Vendor<br/>Access</>)}
            </h2>
            <p className="text-[10px] text-[#bcc9cd] uppercase tracking-widest mt-3">
              {isRegister ? 'Create your vendor account' : 'Authenticate to manage your catalog'}
            </p>
          </div>

          <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-6 relative z-10">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-xs uppercase tracking-widest px-4 py-3 rounded-[12px] text-center font-bold">
                {error}
              </motion.div>
            )}

            <div className="space-y-2 group">
              <label className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#d0bcff] transition-colors">Vendor Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#d0bcff]/50 text-sm group-focus-within:text-[#d0bcff]">alternate_email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vendor@neural-arc.net"
                  className="w-full cyber-input pt-4 pb-3 pl-11 pr-4 rounded-[14px] text-sm placeholder:text-[#3d494c]/80"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold ml-1 group-focus-within:text-[#d0bcff] transition-colors">Access Key</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#d0bcff]/50 text-sm group-focus-within:text-[#d0bcff]">key</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full cyber-input pt-4 pb-3 pl-11 pr-4 rounded-[14px] text-[18px] tracking-[0.2em] placeholder:text-[#3d494c]/80"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-6 rounded-[14px] bg-[#d0bcff] text-[#3c0091] font-headline font-black uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(208,188,255,0.2)] hover:shadow-[0_0_30px_rgba(208,188,255,0.4)] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <><span className="material-symbols-outlined animate-spin text-sm">rotate_right</span> {isRegister ? 'CREATING...' : 'AUTHENTICATING...'}</>
              ) : (
                <><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{isRegister ? 'person_add' : 'lock_open'}</span> {isRegister ? 'CREATE VENDOR ACCOUNT' : 'ACCESS PORTAL'}</>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#3d494c]/20 text-center relative z-10">
            <p className="text-[11px] text-[#bcc9cd] uppercase tracking-widest">
              {isRegister ? 'Already a vendor?' : 'New vendor?'}
              <button
                onClick={() => { setIsRegister(!isRegister); setError(''); }}
                className="text-[#d0bcff] hover:text-white transition-colors font-bold ml-2 underline underline-offset-4 decoration-[#d0bcff]/30 hover:decoration-[#d0bcff]"
              >
                {isRegister ? 'Sign In' : 'Register'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
