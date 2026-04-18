'use client';

import { NavLink } from '../../components/neural/NavLink';

import { motion } from 'framer-motion';

export default function NeuralCatalogPage() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_8px_32px_0_rgba(6,182,212,0.08)] flex justify-between items-center px-8 h-20">
        <div className="text-2xl font-bold tracking-tighter text-cyan-400 uppercase font-headline">
          NEURAL_ARC
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm">
          <NavLink href="/">Storefront</NavLink>
          <NavLink href="/products">Catalog</NavLink>
          <NavLink href="/checkout">Checkout</NavLink>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-cyan-300 transition-all duration-300 scale-95 active:scale-90">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="text-slate-400 hover:text-cyan-300 transition-all duration-300 scale-95 active:scale-90">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>

      {/* Side Navigation / Filter Engine */}
      <aside className="h-screen w-64 fixed left-0 top-20 border-r border-cyan-500/10 bg-[#0e0e10] flex flex-col pt-10 z-40 hidden md:flex">
        <div className="px-8 mb-8">
          <h2 className="text-cyan-400 font-bold font-label uppercase tracking-widest text-xs">FILTER_ENGINE</h2>
          <p className="text-slate-500 text-[10px] tracking-widest mt-1 uppercase">AI-Optimized Parameters</p>
        </div>
        <nav className="flex flex-col font-label uppercase tracking-widest text-xs">
          <div className="text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400 px-8 py-4 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">memory</span>
            Processors
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Neural Links
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">settings_input_component</span>
            Bio-Hardware
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">database</span>
            Storage
          </div>
          <div className="text-slate-500 px-8 py-4 hover:text-cyan-300 hover:bg-white/5 flex items-center gap-3 transition-transform duration-200 ease-in-out cursor-pointer">
            <span className="material-symbols-outlined text-sm">visibility</span>
            Optics
          </div>
        </nav>

        <div className="mt-12 px-8">
          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Core Clusters</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 border border-outline-variant rounded bg-surface-container-lowest group-hover:border-primary transition-colors"></div>
              <span className="text-xs text-slate-400 group-hover:text-on-surface">Trending</span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 border border-outline-variant rounded bg-surface-container-lowest group-hover:border-primary transition-colors"></div>
              <span className="text-xs text-slate-400 group-hover:text-on-surface">Sale</span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 border border-outline-variant rounded bg-surface-container-lowest group-hover:border-primary transition-colors"></div>
              <span className="text-xs text-slate-400 group-hover:text-on-surface">Limited Edition</span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <div className="w-4 h-4 border border-primary rounded bg-primary-container/20"></div>
              <span className="text-xs text-primary">Neural Match</span>
            </label>
          </div>
        </div>

        <div className="mt-auto p-8">
          <button className="w-full py-3 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase hover:bg-cyan-500/10 transition-all">
            RESET_SYSTEM
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="pt-24 pl-0 md:pl-64 min-h-screen">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* Hero Header Section */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-on-surface">
                  NEURAL<span className="text-primary">_CATALOG</span>
                </h1>
                <p className="text-slate-400 font-body mt-4 max-w-xl text-lg leading-relaxed">
                  Augment your cognitive infrastructure with our latest generation of biological and synthetic interfaces.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/20 flex flex-col min-w-[140px]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Nodes</span>
                  <span className="text-2xl font-headline text-secondary">4,802</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/20 flex flex-col min-w-[140px]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Neural Load</span>
                  <span className="text-2xl font-headline text-primary">12.4%</span>
                </div>
              </div>
            </div>
          </header>

          {/* Bento High-Density Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Product Card 1: Featured */}
            <div className="lg:col-span-2 lg:row-span-2 group relative bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 block">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-10"></div>
              <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Futuristic glowing complex neural processor core" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiHtxdj0dNz6vlS9SE1FWwN4860jspH0rhPRlAgmys-14L0_mQIjid-PkGOpIrxxpnFwcMusAompuR2kFIo5DbzzCOwewwbGo-2_vB71ZhSnFHhCoz_x8IBuAQwEAH5WNhx2TvM2vFz6rNSGwACdBE1LKgpTc3x_1C_SDknHJ9HfEUDU77pkzRdlLMexTOy41zvULaW0uN_1vJhFtt7v4nt91jSu3QsjzJj1secfRSKa4cKnnyi_pAZMZgUb5VKCp3uAmoJXsjatXl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/80 to-transparent z-10"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">High Frequency</span>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Limited</span>
                </div>
                <h3 className="text-4xl font-bold font-headline text-on-surface mb-2">AETHER_X9 CORE</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-md">Omni-directional neural processing unit with integrated sub-space communication protocols.</p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest animate-[pulse_2s_infinite] shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:scale-105 transition-transform">
                    ACQUIRE_NODE
                  </button>
                  <button className="bg-white/5 border border-white/10 text-on-surface font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    ADD_TO_CART
                  </button>
                  <span className="ml-auto text-3xl font-bold font-headline text-primary">Ξ 4.50</span>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 hover:border-secondary/30 transition-all flex flex-col justify-between">
              <div className="aspect-square rounded-lg bg-surface-container-lowest mb-6 overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Microchip with violet neon highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gMWuukusfjgIbVpjc8MQIcDZhCvdIpEKN48AKNlPTqj2iDySkvTkyGaHXwpSqxDlFRzHkMKUcnYZ0M7ejGYMiQhPuPhH9WFbnkOl5A5153cHwuVJ9sCdmkSfqMNlfcnoSMf8KdEqq3RYJNOxys2-yRSSlR-PwkB2QIKGYJY61eh-rsCLMt57CNcGc3S-browobWHvF1mS2n_41YtXyzY9g6yAcERA8TC6e7cHs7NEw0fjXXbb-WqBd5onoCOITYKO9AgEx0g-v7k" />
                <div className="absolute top-4 right-4">
                  <span className="bg-surface-container-highest/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-secondary font-bold uppercase">Optic_Link</span>
                </div>
              </div>
              <h4 className="text-xl font-bold font-headline mb-2">SYNAPSE_EYE V.4</h4>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 text-xs text-nowrap mr-2">Bio-Hardware / Optics</span>
                <span className="text-lg font-bold text-on-surface">Ξ 0.85</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-secondary text-on-secondary py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-secondary-fixed transition-colors">ACQUIRE</button>
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-full hover:bg-white/5 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col justify-between">
              <div className="aspect-square rounded-lg bg-surface-container-lowest mb-6 overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Blue glowing computer circuitry detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnLgDdIv2_bPV8M5zbySsrr-VQ0ctuBU6YgVCj91C6ELSbSNwOTRTQEwtBPP5_uMkKqFWsgARX55K9l36PfKHMjNK31C4XYa7KEUj7nRdUTYH2M60tIFLuf9x79ntzL0m_ZHgtDgoWKvyIlNlMUlSYP1YpCFFNPLhRdmQnuqNBWKytKe_knQjULoRFAKEcHztdPAcsK61Bxiajo2y1m9Ph10iQ6w1r_evUXd7X6Gk1D1Yip6PK1B_D8yjE-YnmzQUNchhdFxkCpp9l" />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/20 backdrop-blur-md border border-primary/30 px-2 py-1 rounded text-[10px] text-primary font-bold uppercase">Trending</span>
                </div>
              </div>
              <h4 className="text-xl font-bold font-headline mb-2">NEURO_DRIVE 500TB</h4>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 text-xs text-nowrap mr-2">Storage / Quantum</span>
                <span className="text-lg font-bold text-on-surface">Ξ 1.20</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-primary text-on-primary py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary-fixed transition-colors">ACQUIRE</button>
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-full hover:bg-white/5 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="group bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col justify-between">
              <div className="aspect-square rounded-lg bg-surface-container-lowest mb-6 overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Abstract cybernetic texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqXJYnH_nrPRuteZn9OS0VW9ItQDPQut928xqwLhvH_inMJlrmMEKS0ieoYh8_7ZHaYOuCPbAbBybdXUajGNfB6jTAT9XejSJZFNzyJ5Sxvszaqdf16GoTu4YzP1y68Ga2-uLrAgeyTcJb0fsoLHHLT8s5xMFVckMBoFqGq7pDPkNsp7lxKhyM7pCNEe95eYoLOBXxuTWgVe3hXYLz1_q90G1f6N9wYAfMGH34GTBI98cbyUV1g2TAb1INV1xbFCbyBCVDvNvmvSCU" />
              </div>
              <h4 className="text-xl font-bold font-headline mb-2">LIQUID_LINK 2.0</h4>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 text-xs text-nowrap mr-2">Bio-Hardware / Link</span>
                <span className="text-lg font-bold text-on-surface">Ξ 0.45</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-primary text-on-primary py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary-fixed transition-colors">ACQUIRE</button>
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-full hover:bg-white/5 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Product Card 5 */}
            <div className="group bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 hover:border-secondary/30 transition-all flex flex-col justify-between">
              <div className="aspect-square rounded-lg bg-surface-container-lowest mb-6 overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Futuristic robotic hand detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW6z6Ykn90MgmwfqcCmnyXqCn-5fI5pVlP2oFqOu2VPCuv7d2znpDu9QTx48xs-I3Vvce51DQrg-kuSShrjjA_DHX-_9bhk1SOHtOszIGYubCcLrKkeQetN3JI-kHOfK78OSzCA-txA7s53i3JdQ_6iiD6wrj3YsHfEV4k2jts1MTtPhkTmgE0GAMShPzqqXzmX7zgJO1W9k28zReVQMplHUE9p0j5_8LO9BXQKbYJQmqX8OTrF8mOGhx80DAs_odOQk2fQLC2Sgkf" />
              </div>
              <h4 className="text-xl font-bold font-headline mb-2">KINETIC_ARM_GEN6</h4>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 text-xs text-nowrap mr-2">Hardware / Prosthetic</span>
                <span className="text-lg font-bold text-on-surface">Ξ 3.10</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-secondary text-on-secondary py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-secondary-fixed transition-colors">ACQUIRE</button>
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-full hover:bg-white/5 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Product Card 6 */}
            <div className="group bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 hover:border-tertiary/30 transition-all flex flex-col justify-between">
              <div className="aspect-square rounded-lg bg-surface-container-lowest mb-6 overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Earth from space with digital connections" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwqcBtCK0Xfjp6hrieUzmcvQ6zJ9HIEJFQgahHwfeQdanJ6vI3h4b7G5uvwP4MyeXhEflZw7OZYE5ZtrtWy2Fedu_-cTFxX-rEw0Xe_kmZSulbzRptXz2sPELIvQXn1eak0TOEJrUdHCxH5UH8w0HD6BnRbOiEPOs1axvDS0eD-yANF9L45J3AdpE_uRIeeipgjeU73x5e_7DqlM5qAJOmmfx6PXyVPspakCuy0YWS7qlVfwhocxIVoOHpwJjG3mbN0PGvUGBiNUpg" />
                <div className="absolute top-4 right-4">
                  <span className="bg-tertiary text-on-tertiary px-2 py-1 rounded text-[10px] font-bold uppercase">Hot Release</span>
                </div>
              </div>
              <h4 className="text-xl font-bold font-headline mb-2">ORBITAL_NET_MESH</h4>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 text-xs text-nowrap mr-2">Connectivity / Satellite</span>
                <span className="text-lg font-bold text-on-surface">Ξ 1.95</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-tertiary text-on-tertiary py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">ACQUIRE</button>
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-full hover:bg-white/5 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Product Card 7 */}
            <div className="group bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col justify-between">
              <div className="aspect-square rounded-lg bg-surface-container-lowest mb-6 overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Modern server room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeKntfddYUcIZpd_Ci2cXyY3FMsGpAIqoeaQX_saNtj4NW4IIk5pK0deEeQA5dkNmZMXujtcIUJNw_w_jtQqqfRYJBZDXkP1lvBy6R2mIWcTaGYqJ8tgPiHfLAbA5MxIldwau5mm2jBQFe8_ZcHs_X9xa2lKjukqy7ojCscb_0p7vYETttvs3rE5UvZQRTsN2uw3YByPCZ6OKnTDTcaM4q2QtHXLkYxIdJuVMJoMHv15qnlWxiC_CJd7b0jFaDvKZ7h7ZDULIiJjZy" />
              </div>
              <h4 className="text-xl font-bold font-headline mb-2">VOID_CELL_PRO</h4>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 text-xs text-nowrap mr-2">Processor / Modular</span>
                <span className="text-lg font-bold text-on-surface">Ξ 0.65</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-primary text-on-primary py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary-fixed transition-colors">ACQUIRE</button>
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-full hover:bg-white/5 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* AI Floating Assistant */}
      <div className="fixed bottom-8 right-8 z-[100] group">
        <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-xl animate-pulse group-hover:bg-secondary/40 transition-all"></div>
        <button className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#d0bcff] to-[#571bc1] shadow-[0_0_20px_rgba(208,188,255,0.4)] hover:scale-110 hover:rotate-12 transition-all animate-[pulse_2s_infinite]">
          <span className="material-symbols-outlined text-white text-3xl">smart_toy</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-2 border-background"></div>
        </button>
        <div className="absolute bottom-20 right-0 w-64 bg-surface-container-high border border-outline-variant/20 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-2xl backdrop-blur-lg">
          <p className="text-xs text-on-surface leading-relaxed">
            <span className="text-secondary font-bold">AI_ASSISTANT:</span> Systems optimal. Neural matching predicts high compatibility with <span className="text-primary">AETHER_X9</span> for your profile.
          </p>
        </div>
      </div>
    </div>
  );
}
