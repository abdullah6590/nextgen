'use client';

import { motion } from 'framer-motion';

export default function CheckoutPage() {
  return (
    <div className="bg-surface-container-lowest text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.08)] flex justify-between items-center px-8 py-4 max-w-none">
        <div className="text-xl font-bold tracking-widest text-cyan-400 font-headline uppercase">
          NEURAL_ARCHITECT
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm">
          <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="/">Storefront</a>
          <a className="text-slate-400 hover:text-cyan-200 transition-colors" href="/products">Catalog</a>
          <a className="text-cyan-400 border-b-2 border-cyan-400 pb-1" href="/checkout">Checkout</a>
        </div>
        <div className="flex items-center space-x-6">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-cyan-400 transition-all duration-300">help_outline</span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-cyan-400 transition-all duration-300">lock_person</span>
          <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 overflow-hidden">
            <img className="w-full h-full object-cover rounded-full" alt="Cyberpunk user profile portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuki7s68oSjwqPSgkmWBYO-Cpu2ls13HbINsPVMU61X352UTpayjhVBFppQCKVxtHTy914ojJ5EtREwIJADk107lSJsoeQCeOpXwkz38OutWgmJpYn2yA1TShitcxC5nT0KtATs8jCI2PlH0xYzT7o6lAZgXTb3dqIXaiysK91x4tYTt7DBOX7FZrMMZ_NfTLXMk3CTvQJjnpgr-ZaXTbMECpMZZ4s8oHTIRIWn_aiapOb7vbjXGrI-YNBzNFU4o_0h8Dt7d3K6E8l" />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-[1600px] mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-on-surface mb-2">SECURE_CHECKOUT_V.2</h1>
          <p className="text-sm font-label uppercase tracking-widest text-primary/60">Node Identification &amp; Authorization in Progress</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Neural Identity */}
          <section className="lg:col-span-4 backdrop-blur-[24px] bg-[rgba(19,19,21,0.6)] p-8 rounded-lg border border-outline-variant/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary">fingerprint</span>
              <h2 className="font-headline text-xl font-bold tracking-tight">NEURAL IDENTITY &amp; SHIPPING PROTOCOL</h2>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Protocol Name</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" placeholder="Neural ID Name" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Network Address (Email)</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" placeholder="user@neural.arch" type="email" />
              </div>
              <div className="space-y-2 pt-4">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Destination Node (Physical Address)</label>
                <textarea className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none" placeholder="Sector, Habitat, Coordinate Map" rows={3}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Sector Code</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" placeholder="8821-X" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Priority Link</label>
                  <select className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md p-4 text-on-surface focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                    <option>Instant Warp (Free)</option>
                    <option>Standard Pulse</option>
                  </select>
                </div>
              </div>
            </form>
          </section>

          {/* Column 2: Order Summary */}
          <section className="lg:col-span-4 backdrop-blur-[24px] bg-[rgba(19,19,21,0.6)] p-8 rounded-lg border border-outline-variant/10 shadow-2xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-secondary">inventory_2</span>
                <h2 className="font-headline text-xl font-bold tracking-tight uppercase">Order Summary &amp; Node Inventory</h2>
              </div>
              <div className="space-y-6">
                
                {/* Product Item 1 */}
                <div className="flex items-center gap-4 bg-surface-container-high/40 p-4 rounded-md border border-outline-variant/5">
                  <div className="w-20 h-20 bg-surface rounded-md overflow-hidden flex-shrink-0 border border-outline-variant/20">
                    <img className="w-full h-full object-cover opacity-80" alt="Abstract cyan neural core visualization" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcV1rYRaFMqymNjs9sOYLGwUjQMJgK98fuCDf01YDLqhi8rh12ah0G8H6seqAEzfmrVl0iWgJHuIj23guKN1K4cw_EgVYHYQMIsdeaYwENfZHDDPX2kvTZJHGBkKAYGVBafHslMvcosIH_tSArp8tpq_Q_AIx_bMyT8wwYV0a4T4h_MkbAtTQQEIXHvXVztlrDcOA_eHazy-itZ3_k5rTR8jjYyACyKKYHZ8PJ58HH-6UelvH0cabBjXi0XkHKhP3aZ8kMQHCOFOp8" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-headline text-sm font-bold tracking-tight text-on-surface">Xenon-9 Core</h3>
                    <p className="text-xs text-outline mb-2">Gen-4 Neural Processor</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Qty: 01</span>
                      <span className="font-headline text-sm font-bold">$1,240.00</span>
                    </div>
                  </div>
                </div>

                {/* Product Item 2 */}
                <div className="flex items-center gap-4 bg-surface-container-high/40 p-4 rounded-md border border-outline-variant/5">
                  <div className="w-20 h-20 bg-surface rounded-md overflow-hidden flex-shrink-0 border border-outline-variant/20">
                    <img className="w-full h-full object-cover opacity-80" alt="Iridescent bio-synth texture pattern" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMGEsWgHxKzafAUjXEq5Iz5Cb8cbC9b-wA9a55YO8L2SEK6i8HXGbIBjcBmU0wgiJ0g1gEA_sMRqUKL8ffgOSxfDLnd0VIDUk0IM9Kp6uBzDun8SZAJkATlEQGFk5GsNNRSD2YMS8CYOzhBu3oO4CjREgJifVoMlWgWeqM_1zfVBL92G-Q43QHi-zxY1OHCMjA29jZMJi03QrvlSX-oTeF-sWOrBj3Yag_By6BiqTDGTUVvcDb2hY-xotTRwwcd0F2sUN281H3rV6p" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-headline text-sm font-bold tracking-tight text-on-surface">Bio-Synth Textures</h3>
                    <p className="text-xs text-outline mb-2">Liquid Silicon Membrane</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Qty: 04</span>
                      <span className="font-headline text-sm font-bold">$499.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-outline-variant/20 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-outline uppercase tracking-wider font-label text-[10px]">Subtotal_Load</span>
                <span className="font-headline font-medium">$1,739.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-outline uppercase tracking-wider font-label text-[10px]">Protocol_Fee</span>
                <span className="font-headline font-medium text-primary">$0.00</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-outline-variant/20 mt-4">
                <span className="text-on-surface font-headline font-bold uppercase tracking-widest text-xs">Total_Matrix_Cost</span>
                <span className="text-3xl font-headline font-bold text-primary tracking-tighter">$1,739.00</span>
              </div>
            </div>
          </section>

          {/* Column 3: Payment Matrix */}
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
                    <div className="w-4 h-4 rounded-full border-2 border-outline-variant peer-checked:border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                </label>

                <label className="relative group cursor-pointer">
                  <input className="peer hidden" name="payment" type="radio" value="neural" />
                  <div className="flex items-center justify-between p-4 rounded-md border border-outline-variant/20 bg-surface-container-low peer-checked:border-secondary peer-checked:bg-secondary/5 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">bolt</span>
                      <div>
                        <p className="font-headline text-sm font-bold uppercase tracking-tight">Neural Credits</p>
                        <p className="text-[10px] text-outline">Aetheris Native Token</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-outline-variant peer-checked:border-secondary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-secondary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                    <div className="w-4 h-4 rounded-full border-2 border-outline-variant peer-checked:border-on-surface flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-on-surface opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
            
            <button className="w-full mt-4 py-6 px-8 rounded-full bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-headline font-bold text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(87,27,193,0.3)] hover:shadow-[0_0_60px_rgba(87,27,193,0.5)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 group">
              AUTHORIZE_TRANSACTION
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
            </button>
          </section>
        </div>
      </main>

      {/* Chatbot Icon */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-16 h-16 rounded-full backdrop-blur-[24px] bg-[rgba(19,19,21,0.6)] border border-primary/30 flex items-center justify-center cursor-pointer shadow-[0_0_24px_rgba(76,215,246,0.2)] hover:scale-110 transition-transform group">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>smart_toy</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-2 border-surface animate-pulse"></div>
        </div>
      </div>

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
