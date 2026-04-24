'use client';

import { NavLink } from '../../components/neural/NavLink';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const MOCK_ASSETS = [
  { id: 1, name: 'Iridescent Mesh Kit', type: 'Material', match: '99.4%', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0kL0OVc4DTI5hZ1_sYW3t4MxQrpudSwaD79qPf8w16b0gibEsdps4OaLyZEFW2eG5PjkjOjjAU8hKCvhFPo9lC77gQzEg0jOeKEFUuR3oUe7NASDiKZgRhcVU5q1TH2tgcbVU1kf_CayrCWEwEWxaXLOVpchGKMGhnC5kiiubSfvqi6GpMlHymLu9ufHq1FJVW5ewSBGsqoANc7DTaaLEx_eoyQCqDc1Kan0i87b9bc0lNfn6mrgBymgvaQzcRw62UqS_PgEjr5Zm' },
  { id: 2, name: 'Neo-Tokyo Enviro', type: 'Scene Core', match: '98.1%', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnUssltF04v92j3XMPmRKSqs8u_bDolyYBBWuEXCfTkbIjHbSZKO8Gn7b3Of6GJVFTyo6sdIHOW_Y9FFLg5AENvJP3LHFSQ-iYF4l_JHDG9ERYmQEauipMqEjTBiIaklARI1lTRkwmfBp-FgJ6X6ai4QTQ2Xv09hApC6T9tujWSfvLtXPBc-ewuLdib9n8zI8FcTRzs_mxQ3IItWzbP2HvQALEbqwO095-ii94G-b1ExTlKQeyCuyRiQyMmIqUOjydrjpLqpW1nZLM' },
  { id: 3, name: 'Plasma Drive 8K', type: 'Propulsor', match: '94.2%', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYg3MLCZzaEhLC9vGyi-A0jJah_1MXja3CP6WOebzBr6lOMg-uq4z0GoYPP3_YhPFYSENh4uadYTV9oIpwJrW2uAGF_2hNNnVCfKF1dXQPlIJF2y0jMibn8wCqFLJAaiDj_Wp_5yi24LneCWyzVR3XM3vV31B8YHfKEBcr9scJ5dd98OzbfZt0WyobW_1y2-hub2jCEwxuNRMHnA-K0WyKULBJa362JWVmcmYFSE0QhEQxpQWClxEMv6lSL7h8vDYOhj6TGGIDu0l' }
];

const MOCK_ORDERS = [
  { id: 'ORD-993-X', date: '2024.03.12', status: 'Delivered', amount: '1.2 ETH', item: 'Quantum Rotation Module' },
  { id: 'ORD-984-Y', date: '2024.02.28', status: 'Processing', amount: '0.8 ETH', item: 'Bio-Synth Textures' },
  { id: 'ORD-942-Z', date: '2024.01.15', status: 'Delivered', amount: '3.4 ETH', item: 'Neural Core v2' }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('vault');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [twoFactorMessage, setTwoFactorMessage] = useState({ type: '', text: '' });
  const [isSettingUp, setIsSettingUp] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      setProfile(response.data);
      setTwoFactorEnabled(response.data.twoFactorEnabled || false);
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    setTwoFactorMessage({ type: '', text: '' });
    try {
      const response = await api.post('/auth/2fa/setup');
      setQrCodeDataUrl(response.data.qrCodeDataUrl);
      setIsSettingUp(true);
    } catch (err: any) {
      setTwoFactorMessage({ type: 'error', text: err.response?.data?.message || 'Failed to initiate 2FA setup' });
    }
  };

  const handleVerify2FA = async () => {
    setTwoFactorMessage({ type: '', text: '' });
    try {
      await api.post('/auth/2fa/verify', { token: totpCode });
      setTwoFactorEnabled(true);
      setIsSettingUp(false);
      setTotpCode('');
      setQrCodeDataUrl('');
      setTwoFactorMessage({ type: 'success', text: 'Two-Factor Authentication successfully enabled.' });
    } catch (err: any) {
      setTwoFactorMessage({ type: 'error', text: err.response?.data?.message || 'Invalid verification code.' });
    }
  };

  const handleDisable2FA = async () => {
    setTwoFactorMessage({ type: '', text: '' });
    try {
      await api.post('/auth/2fa/disable', { token: totpCode });
      setTwoFactorEnabled(false);
      setTotpCode('');
      setTwoFactorMessage({ type: 'success', text: 'Two-Factor Authentication has been disabled.' });
    } catch (err: any) {
      setTwoFactorMessage({ type: 'error', text: err.response?.data?.message || 'Invalid code or failed to disable 2FA.' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="bg-[#0e0e10] text-slate-300 font-body selection:bg-cyan-500/30 min-h-screen relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen" style={{ animation: 'pulse 4s infinite alternate' }}></div>
      </div>

      {/* Top Navigation Frame */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/40 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_4px_30px_0_rgba(76,215,246,0.05)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
          <Link href="/" className="text-2xl font-black tracking-tighter text-cyan-400 font-headline uppercase hover:text-cyan-300 transition-colors">NEURAL_ARC</Link>
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm">
            <NavLink href="/">Storefront</NavLink>
            <NavLink href="/products">Catalog</NavLink>
            <NavLink href="/checkout">Checkout</NavLink>
            <NavLink href="/profile">Profile Info</NavLink>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-cyan-400 transition-all duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="text-slate-400 hover:text-cyan-400 transition-all duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined">smart_toy</span>
            </button>
            <div className="w-10 h-10 rounded-full border border-cyan-400 shadow-[0_0_15px_rgba(76,215,246,0.5)] overflow-hidden scale-110">
              <img alt="User Neural Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy1PiqlAxEKDb59OF_RW385I9g3Ebmj7gFIoZJIfaeh7y735x5UTQmPwpEUK5aLODyDzLNAHL--M4Z37T2T7QCTrrigc_eKvICV_ArCt63fwTjCTwgJ4gANtZhN5nCaB3Z7lUGyDu3uRDXJtCkPxK2S5ceVZBj0vRiZtNMC_E7kCFdeQ1PIbAgugdQI1Ww5woCM0RfTTIUqUa9YMYTN1qP9LaU6GWkvYSq-QPtvwmLHxnJpBcEpvwSS39vdU6m0ssr1qxP_29Xexdl" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4 md:px-8 max-w-[1600px] mx-auto relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Identity Core (Left Sidebar) */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-4 lg:row-span-2">
            <div className="bg-[rgba(19,19,21,0.4)] backdrop-blur-2xl border border-cyan-500/20 rounded-[24px] overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 flex flex-col items-center border-b border-slate-800/50 relative">
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-[10px] uppercase font-bold text-green-400 tracking-widest">Node Active</span>
                </div>
                
                <div className="w-32 h-32 rounded-full border-2 border-cyan-400/50 p-1 relative mb-6 group-hover:border-cyan-400 transition-colors duration-500 shadow-[0_0_30px_rgba(76,215,246,0.1)]">
                  <img alt="Neural Avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy1PiqlAxEKDb59OF_RW385I9g3Ebmj7gFIoZJIfaeh7y735x5UTQmPwpEUK5aLODyDzLNAHL--M4Z37T2T7QCTrrigc_eKvICV_ArCt63fwTjCTwgJ4gANtZhN5nCaB3Z7lUGyDu3uRDXJtCkPxK2S5ceVZBj0vRiZtNMC_E7kCFdeQ1PIbAgugdQI1Ww5woCM0RfTTIUqUa9YMYTN1qP9LaU6GWkvYSq-QPtvwmLHxnJpBcEpvwSS39vdU6m0ssr1qxP_29Xexdl" />
                  <div className="absolute inset-0 border border-cyan-400 rounded-full animate-[spin_10s_linear_infinite] opacity-50"></div>
                </div>
                
                <h1 className="text-3xl font-headline font-black text-white tracking-tighter uppercase mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Architect_Prime</h1>
                <p className="text-cyan-400/80 text-xs font-label uppercase tracking-[0.2em] mb-6">Class: Synthesizer</p>
                
                <div className="w-full grid grid-cols-2 gap-4 text-center mt-2">
                  <div className="bg-[#131315]/80 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Neural Sync</span>
                    <span className="text-xl font-bold text-violet-400">99.8%</span>
                  </div>
                  <div className="bg-[#131315]/80 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Credits</span>
                    <span className="text-xl font-bold text-cyan-400">4,280</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab('vault')}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 font-label uppercase tracking-widest text-xs font-bold ${activeTab === 'vault' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                >
                  <span className="material-symbols-outlined text-lg">inventory_2</span> Asset Vault
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 font-label uppercase tracking-widest text-xs font-bold ${activeTab === 'logs' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                >
                  <span className="material-symbols-outlined text-lg">receipt_long</span> Transaction Logs
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 font-label uppercase tracking-widest text-xs font-bold ${activeTab === 'settings' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                >
                  <span className="material-symbols-outlined text-lg">settings_suggest</span> System Parameters
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col gap-4">
               <button className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-900/10 border border-red-500/20 text-red-400 font-headline font-bold uppercase tracking-[0.2em] text-xs hover:bg-red-500/20 hover:border-red-500/40 transition-all flex items-center justify-center gap-2">
                 <span className="material-symbols-outlined text-sm">power_settings_new</span> Terminate Session
               </button>
            </div>
          </motion.div>

          {/* Main Display Matrix */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-8 flex flex-col h-full min-h-[600px]">
             <div className="bg-[rgba(19,19,21,0.4)] backdrop-blur-2xl border border-slate-800 rounded-[24px] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex-grow relative overflow-hidden">
               
               <AnimatePresence mode="wait">
                 {/* Asset Vault View */}
                 {activeTab === 'vault' && (
                   <motion.div key="vault" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full">
                     <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                       <div>
                         <h2 className="text-2xl font-headline font-black tracking-tight text-white uppercase">Asset Vault</h2>
                         <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Acquired Neural Constructs</p>
                       </div>
                       <button className="text-cyan-400 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-cyan-300">
                         <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                       </button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {MOCK_ASSETS.map((asset) => (
                         <div key={asset.id} className="group relative rounded-xl overflow-hidden border border-slate-800 bg-[#131315]/80 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
                           <div className="h-40 overflow-hidden relative">
                             <img src={asset.image} alt={asset.name} className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                             <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                               Match {asset.match}
                             </div>
                           </div>
                           <div className="p-5 relative z-10 bg-gradient-to-t from-[#131315] to-transparent">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                <span className="text-[10px] text-cyan-400 uppercase tracking-widest">{asset.type}</span>
                             </div>
                             <h3 className="font-headline font-bold text-lg text-white group-hover:text-cyan-200 transition-colors">{asset.name}</h3>
                           </div>
                         </div>
                       ))}
                       
                       <div className="rounded-xl border border-dashed border-slate-700 bg-transparent hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 flex flex-col items-center justify-center min-h-[260px] cursor-pointer group">
                         <div className="w-12 h-12 rounded-full border border-slate-600 group-hover:border-cyan-400 text-slate-500 group-hover:text-cyan-400 flex items-center justify-center mb-4 transition-colors">
                           <span className="material-symbols-outlined">add</span>
                         </div>
                         <h3 className="font-headline font-bold text-slate-400 group-hover:text-cyan-200 uppercase tracking-wider">Acquire New Asset</h3>
                       </div>
                     </div>
                   </motion.div>
                 )}

                 {/* Transaction Logs View */}
                 {activeTab === 'logs' && (
                   <motion.div key="logs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full">
                     <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                       <div>
                         <h2 className="text-2xl font-headline font-black tracking-tight text-white uppercase">Transaction Logs</h2>
                         <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Immutable Immutable Ledger History</p>
                       </div>
                       <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                         <span className="text-[10px] uppercase font-bold text-violet-400 tracking-widest">Network Synced</span>
                       </div>
                     </div>
                     
                     <div className="flex flex-col gap-4">
                       {MOCK_ORDERS.map((order, idx) => (
                         <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-slate-800 bg-[#131315]/80 hover:border-violet-500/30 hover:bg-violet-900/10 transition-all group">
                           <div className="flex items-center gap-4 mb-4 md:mb-0">
                             <div className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                               <span className="material-symbols-outlined">api</span>
                             </div>
                             <div>
                               <h4 className="font-bold text-white mb-0.5 group-hover:text-violet-200 transition-colors uppercase tracking-tight">{order.item}</h4>
                               <p className="text-xs text-slate-500 font-label tracking-widest uppercase">{order.id} // {order.date}</p>
                             </div>
                           </div>
                           <div className="flex items-center justify-between md:flex-col md:items-end md:gap-1">
                             <div className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider font-bold \${order.status === 'Delivered' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                               {order.status}
                             </div>
                             <span className="font-headline font-bold text-white">{order.amount}</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </motion.div>
                 )}

                 {/* System Parameters View */}
                 {activeTab === 'settings' && (
                   <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full">
                     <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                       <div>
                         <h2 className="text-2xl font-headline font-black tracking-tight text-white uppercase">System Parameters</h2>
                         <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Node Configuration Settings</p>
                       </div>
                     </div>
                     
                     <div className="space-y-8">
                       <section>
                         <h3 className="font-headline text-lg text-pink-400 uppercase tracking-wider mb-4 border-l-2 border-pink-400 pl-3">Network Identity</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Alias Designation</label>
                             <input type="text" defaultValue="Architect_Prime" className="w-full bg-[#131315] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Comms Relay (Email)</label>
                             <input type="email" defaultValue="prime@neural.arc" className="w-full bg-[#131315] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                           </div>
                         </div>
                       </section>
                       
                       <section>
                         <h3 className="font-headline text-lg text-pink-400 uppercase tracking-wider mb-4 border-l-2 border-pink-400 pl-3">Interface Preferences</h3>
                         <div className="space-y-4">
                           <div className="flex items-center justify-between p-4 bg-[#131315]/80 border border-slate-800 rounded-lg">
                             <div>
                               <p className="font-bold text-white uppercase tracking-tight text-sm">Holographic Overlays</p>
                               <p className="text-xs text-slate-500 mt-1">Enable 3D parallax effects in application matrix</p>
                             </div>
                             <div className="w-12 h-6 rounded-full bg-pink-500/20 border border-pink-500/50 relative cursor-pointer flex items-center shadow-[0_0_10px_rgba(236,72,153,0.2)]">
                               <div className="w-4 h-4 rounded-full bg-pink-400 absolute right-1 shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                             </div>
                           </div>
                           <div className="flex items-center justify-between p-4 bg-[#131315]/80 border border-slate-800 rounded-lg">
                             <div>
                               <p className="font-bold text-white uppercase tracking-tight text-sm">Neural Notifications</p>
                               <p className="text-xs text-slate-500 mt-1">Direct to cortex transmission of asset availability</p>
                             </div>
                             <div className="w-12 h-6 rounded-full bg-slate-800 border border-slate-700 relative cursor-pointer flex items-center">
                               <div className="w-4 h-4 rounded-full bg-slate-500 absolute left-1"></div>
                             </div>
                           </div>
                         </div>
                       </section>

                       <section>
                         <h3 className="font-headline text-lg text-[#4cd7f6] uppercase tracking-wider mb-4 border-l-2 border-[#4cd7f6] pl-3">Identity Security</h3>
                         <div className="p-6 bg-[#131315]/80 border border-[#3d494c]/30 rounded-lg">
                           <div className="flex items-start justify-between mb-6">
                             <div>
                               <h4 className="font-bold text-white uppercase tracking-tight flex items-center gap-2">
                                 Two-Factor Authentication (2FA)
                                 {twoFactorEnabled ? (
                                   <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">ENABLED</span>
                                 ) : (
                                   <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">DISABLED</span>
                                 )}
                               </h4>
                               <p className="text-sm text-slate-400 mt-2 max-w-md">
                                 Add an extra layer of security to your neural profile. When enabled, you'll need to enter a time-sensitive code from your authenticator device during login.
                               </p>
                             </div>
                             <div>
                               {twoFactorEnabled ? (
                                 <div className="flex items-center gap-3">
                                   {isSettingUp ? (
                                     <div className="flex items-center gap-2">
                                       <input
                                         type="text"
                                         value={totpCode}
                                         onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                                         placeholder="000000"
                                         className="w-24 bg-[#0e0e10] border border-slate-700 rounded p-2 text-white text-center font-mono focus:border-[#4cd7f6] outline-none"
                                         maxLength={6}
                                       />
                                       <button onClick={handleDisable2FA} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded transition-colors text-xs font-bold uppercase tracking-wider">
                                         Confirm Disable
                                       </button>
                                       <button onClick={() => { setIsSettingUp(false); setTotpCode(''); setTwoFactorMessage({type:'',text:''}); }} className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
                                         Cancel
                                       </button>
                                     </div>
                                   ) : (
                                     <button onClick={() => setIsSettingUp(true)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors text-xs font-bold uppercase tracking-wider">
                                       Disable 2FA
                                     </button>
                                   )}
                                 </div>
                               ) : (
                                 !isSettingUp && (
                                   <button onClick={handleEnable2FA} className="px-4 py-2 bg-[#4cd7f6]/20 hover:bg-[#4cd7f6]/30 text-[#4cd7f6] border border-[#4cd7f6]/50 rounded transition-colors text-xs font-bold uppercase tracking-wider">
                                     Enable 2FA
                                   </button>
                                 )
                               )}
                             </div>
                           </div>

                           {twoFactorMessage.text && (
                             <div className={`p-3 mb-6 rounded text-sm font-bold uppercase tracking-widest text-center border ${
                               twoFactorMessage.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                             }`}>
                               {twoFactorMessage.text}
                             </div>
                           )}

                           <AnimatePresence>
                             {isSettingUp && !twoFactorEnabled && qrCodeDataUrl && (
                               <motion.div
                                 initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: 'auto' }}
                                 exit={{ opacity: 0, height: 0 }}
                                 className="border-t border-[#3d494c]/30 pt-6 mt-6 flex flex-col items-center"
                               >
                                 <h5 className="text-[#bcc9cd] text-xs font-bold uppercase tracking-widest mb-4">1. Scan QR Code</h5>
                                 <div className="bg-white p-2 rounded-lg mb-6 shadow-[0_0_20px_rgba(76,215,246,0.2)]">
                                   <img src={qrCodeDataUrl} alt="2FA QR Code" className="w-40 h-40" />
                                 </div>
                                 
                                 <h5 className="text-[#bcc9cd] text-xs font-bold uppercase tracking-widest mb-4">2. Enter Verification Code</h5>
                                 <div className="flex gap-4 w-full max-w-xs">
                                   <input
                                     type="text"
                                     value={totpCode}
                                     onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                                     placeholder="000000"
                                     className="flex-1 bg-[#0e0e10] border border-[#4cd7f6]/30 rounded p-3 text-white text-center font-mono text-xl focus:border-[#4cd7f6] focus:shadow-[0_0_10px_rgba(76,215,246,0.2)] outline-none transition-all"
                                     maxLength={6}
                                   />
                                 </div>
                                 
                                 <div className="flex gap-3 mt-6">
                                   <button 
                                     onClick={() => { setIsSettingUp(false); setQrCodeDataUrl(''); setTotpCode(''); setTwoFactorMessage({type:'',text:''}); }}
                                     className="px-6 py-2 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded uppercase tracking-wider text-xs font-bold transition-colors"
                                   >
                                     Cancel
                                   </button>
                                   <button 
                                     onClick={handleVerify2FA}
                                     disabled={totpCode.length !== 6}
                                     className="px-6 py-2 bg-[#4cd7f6] text-[#003640] rounded uppercase tracking-wider text-xs font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                   >
                                     Verify & Enable
                                   </button>
                                 </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
                       </section>

                       <button className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-headline font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-95 transition-all mt-4">
                         Apply Sector Parameters
                       </button>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Decorative Grid */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>
  );
}
