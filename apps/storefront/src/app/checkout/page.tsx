'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { NavLink } from '../../components/neural/NavLink';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Shipping form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [sectorCode, setSectorCode] = useState('');

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (items.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const { data } = await api.post('/orders', orderPayload);
      setOrderId(data.id);
      setOrderSuccess(true);
      clearCart();
    } catch (err: any) {
      const serverError = err.response?.data?.error || 'Transaction failed. Please retry.';
      const details = err.response?.data?.details;
      if (details && Array.isArray(details)) {
        const stockIssues = details.map((d: any) => `${d.name}: requested ${d.requested}, available ${d.available}`).join('; ');
        setError(`${serverError} — ${stockIssues}`);
      } else {
        setError(serverError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (orderSuccess) {
    return (
      <div className="bg-[#09090b] text-[#e5e1e4] font-body min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#4cd7f6] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-widest mb-4">Transaction<br/>Authorized</h1>
          <p className="text-[#bcc9cd] text-sm mb-2">Order #{orderId?.toString().padStart(6, '0')} has been processed successfully.</p>
          <p className="text-[10px] text-[#4cd7f6] uppercase tracking-widest mb-10">Neural routing confirmed • Delivery pipeline active</p>
          <div className="flex gap-4 justify-center">
            <Link href="/orders" className="px-8 py-4 rounded-[14px] bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.15em] text-sm hover:scale-[1.03] active:scale-[0.98] transition-all">
              View Orders
            </Link>
            <Link href="/products" className="px-8 py-4 rounded-[14px] border border-[#3d494c]/30 text-[#bcc9cd] font-headline font-bold uppercase tracking-[0.15em] text-sm hover:border-[#4cd7f6]/50 hover:text-white transition-all">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.08)] flex justify-between items-center px-8 py-4 max-w-none">
        <div className="text-xl font-bold tracking-widest text-cyan-400 font-headline uppercase">
          NEURAL_ARCHITECT
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm">
          <NavLink href="/">Storefront</NavLink>
          <NavLink href="/products">Catalog</NavLink>
          <NavLink href="/checkout">Checkout</NavLink>
        </div>
        <div className="flex items-center space-x-6">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-cyan-400 transition-all duration-300">help_outline</span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-cyan-400 transition-all duration-300">lock_person</span>
          <Link href="/profile" className="w-10 h-10 rounded-full border border-primary/20 p-0.5 overflow-hidden hover:border-primary/50 hover:scale-105 transition-all cursor-pointer block">
            <img className="w-full h-full object-cover rounded-full" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuki7s68oSjwqPSgkmWBYO-Cpu2ls13HbINsPVMU61X352UTpayjhVBFppQCKVxtHTy914ojJ5EtREwIJADk107lSJsoeQCeOpXwkz38OutWgmJpYn2yA1TShitcxC5nT0KtATs8jCI2PlH0xYzT7o6lAZgXTb3dqIXaiysK91x4tYTt7DBOX7FZrMMZ_NfTLXMk3CTvQJjnpgr-ZaXTbMECpMZZ4s8oHTIRIWn_aiapOb7vbjXGrI-YNBzNFU4o_0h8Dt7d3K6E8l" />
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-[1600px] mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-on-surface mb-2">SECURE_CHECKOUT_V.2</h1>
          <p className="text-sm font-label uppercase tracking-widest text-primary/60">Node Identification &amp; Authorization in Progress</p>
        </header>

        {items.length === 0 && !orderSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 backdrop-blur-[24px] bg-[rgba(19,19,21,0.6)] rounded-lg border border-outline-variant/10"
          >
            <span className="material-symbols-outlined text-6xl text-outline/30 mb-6 block">shopping_cart</span>
            <p className="text-outline uppercase tracking-widest font-headline text-sm mb-6">Cart matrix is empty</p>
            <Link href="/products" className="inline-block px-8 py-4 rounded-[14px] bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.15em] text-sm hover:scale-[1.03] transition-transform">
              Browse Catalog
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Column 1: Shipping Info */}
            <section className="lg:col-span-4 backdrop-blur-[24px] bg-[rgba(19,19,21,0.6)] p-8 rounded-lg border border-outline-variant/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">fingerprint</span>
                <h2 className="font-headline text-xl font-bold tracking-tight">NEURAL IDENTITY &amp; SHIPPING PROTOCOL</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Protocol Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Neural ID Name"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Network Address (Email)</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="user@neural.arch"
                    type="email"
                  />
                </div>
                <div className="space-y-2 pt-4">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Destination Node (Physical Address)</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Sector, Habitat, Coordinate Map"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Sector Code</label>
                    <input
                      value={sectorCode}
                      onChange={(e) => setSectorCode(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      placeholder="8821-X"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Priority Link</label>
                    <select className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                      <option>Instant Warp (Free)</option>
                      <option>Standard Pulse</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Column 2: Dynamic Order Summary from Cart */}
            <section className="lg:col-span-4 backdrop-blur-[24px] bg-[rgba(19,19,21,0.6)] p-8 rounded-lg border border-outline-variant/10 shadow-2xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-secondary">inventory_2</span>
                  <h2 className="font-headline text-xl font-bold tracking-tight uppercase">Order Summary &amp; Node Inventory</h2>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-4 bg-surface-container-high/40 p-4 rounded-md border border-outline-variant/5"
                      >
                        <div className="w-16 h-16 bg-surface rounded-md overflow-hidden flex-shrink-0 border border-outline-variant/20">
                          {item.image ? (
                            <img className="w-full h-full object-cover opacity-80" alt={item.name} src={item.image} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-outline/30">inventory_2</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-headline text-sm font-bold tracking-tight text-on-surface truncate">{item.name}</h3>
                          <p className="text-xs text-outline mb-2">${item.price.toFixed(2)} each</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="w-6 h-6 rounded border border-outline-variant/20 flex items-center justify-center text-outline hover:text-primary hover:border-primary/30 transition-colors text-xs"
                              >
                                −
                              </button>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-6 h-6 rounded border border-outline-variant/20 flex items-center justify-center text-outline hover:text-primary hover:border-primary/30 transition-colors text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-headline text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10 text-outline hover:text-red-400 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-outline-variant/20 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-outline uppercase tracking-wider font-label text-[10px]">Subtotal_Load</span>
                  <span className="font-headline font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-outline uppercase tracking-wider font-label text-[10px]">Protocol_Fee</span>
                  <span className="font-headline font-medium text-primary">$0.00</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-outline-variant/20 mt-4">
                  <span className="text-on-surface font-headline font-bold uppercase tracking-widest text-xs">Total_Matrix_Cost</span>
                  <span className="text-3xl font-headline font-bold text-primary tracking-tighter">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Column 3: Payment & Submit */}
            <section className="lg:col-span-4 space-y-8 flex flex-col h-full">
              <div className="backdrop-blur-[24px] bg-[rgba(19,19,21,0.6)] p-8 rounded-lg border border-outline-variant/10 shadow-2xl flex-grow">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-tertiary">account_balance_wallet</span>
                  <h2 className="font-headline text-xl font-bold tracking-tight uppercase">Payment Matrix</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <label className="relative group cursor-pointer">
                    <input defaultChecked className="peer hidden" name="payment" type="radio" value="crypto" />
                    <div className="flex items-center justify-between p-4 rounded-md border border-outline-variant/20 bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">currency_bitcoin</span>
                        <div>
                          <p className="font-headline text-sm font-bold uppercase tracking-tight">Crypto Cluster</p>
                          <p className="text-[10px] text-outline">ETH / SOL / BTC</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="relative group cursor-pointer">
                    <input className="peer hidden" name="payment" type="radio" value="fiat" />
                    <div className="flex items-center justify-between p-4 rounded-md border border-outline-variant/20 bg-surface-container-low peer-checked:border-on-surface peer-checked:bg-on-surface/5 transition-all">
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-outline group-hover:text-on-surface transition-colors">credit_card</span>
                        <div>
                          <p className="font-headline text-sm font-bold uppercase tracking-tight">Standard Payment</p>
                          <p className="text-[10px] text-outline">Legacy Fiat Cards</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="mt-8 p-4 rounded-md bg-tertiary/5 border border-tertiary/20">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">verified_user</span>
                    <p className="text-[10px] text-tertiary font-medium leading-relaxed uppercase tracking-wider">Secure quantum-encrypted tunnel established. Node transaction will be immutable once authorized.</p>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest text-center font-bold"
                >
                  {error}
                </motion.div>
              )}

              {!isAuthenticated && (
                <div className="p-4 rounded-lg bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 text-[#4cd7f6] text-xs uppercase tracking-widest text-center font-bold">
                  <Link href="/login" className="hover:text-white transition-colors">Authentication required → Login</Link>
                </div>
              )}
              
              <button
                onClick={handlePlaceOrder}
                disabled={loading || items.length === 0 || !isAuthenticated}
                className="w-full mt-4 py-6 px-8 rounded-full bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-headline font-bold text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(87,27,193,0.3)] hover:shadow-[0_0_60px_rgba(87,27,193,0.5)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 group disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin">rotate_right</span> PROCESSING...</>
                ) : (
                  <>AUTHORIZE_TRANSACTION <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span></>
                )}
              </button>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 border-t border-white/5 bg-[#0e0e10] flex flex-col md:flex-row justify-between items-center gap-6 mt-20">
        <div className="text-cyan-500 font-black font-headline uppercase tracking-widest">
          NEURAL_ARCHITECT
        </div>
        <div className="flex flex-wrap justify-center gap-8 font-label text-xs uppercase tracking-[0.2em]">
          <a className="text-slate-500 hover:text-cyan-400 transition-colors duration-200" href="#">Privacy Protocol</a>
          <a className="text-slate-500 hover:text-cyan-400 transition-colors duration-200" href="#">Service Terms</a>
          <a className="text-slate-500 hover:text-cyan-400 transition-colors duration-200" href="#">Neural Support</a>
          <a className="text-slate-500 hover:text-cyan-400 transition-colors duration-200" href="#">System Status</a>
        </div>
        <div className="text-slate-500 font-label text-[10px] uppercase tracking-[0.2em]">
          © 2024 NEURAL ARCHITECT. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
