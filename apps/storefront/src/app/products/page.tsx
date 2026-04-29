'use client';

import { TopNav } from '../../components/neural/TopNav';
import { CatalogProductCard } from '../../components/neural/CatalogProductCard';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Chatbot } from '../../components/neural/Chatbot';

import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function NeuralCatalogPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAcquireFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ productId: "1", name: "AETHER_X9 CORE", price: 4.50, quantity: 1 });
    router.push('/checkout');
  };

  const handleAddToCartFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ productId: "1", name: "AETHER_X9 CORE", price: 4.50, quantity: 1 });
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen overflow-x-hidden">
      <TopNav />

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
              <Link href="/product/1" className="absolute inset-0 z-10" aria-label="View Product" />
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-10 pointer-events-none"></div>
              <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Futuristic glowing complex neural processor core" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiHtxdj0dNz6vlS9SE1FWwN4860jspH0rhPRlAgmys-14L0_mQIjid-PkGOpIrxxpnFwcMusAompuR2kFIo5DbzzCOwewwbGo-2_vB71ZhSnFHhCoz_x8IBuAQwEAH5WNhx2TvM2vFz6rNSGwACdBE1LKgpTc3x_1C_SDknHJ9HfEUDU77pkzRdlLMexTOy41zvULaW0uN_1vJhFtt7v4nt91jSu3QsjzJj1secfRSKa4cKnnyi_pAZMZgUb5VKCp3uAmoJXsjatXl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/80 to-transparent z-10"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">High Frequency</span>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Limited</span>
                </div>
                <h3 className="text-4xl font-bold font-headline text-on-surface mb-2">AETHER_X9 CORE</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-md">Omni-directional neural processing unit with integrated sub-space communication protocols.</p>
                <div className="flex flex-wrap items-center gap-4 relative z-20">
                  <button 
                    onClick={handleAcquireFeatured}
                    className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest animate-[pulse_2s_infinite] shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:scale-105 transition-transform">
                    ACQUIRE_NODE
                  </button>
                  <button 
                    onClick={handleAddToCartFeatured}
                    className="bg-white/5 border border-white/10 text-on-surface font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    ADD_TO_CART
                  </button>
                  <span className="ml-auto text-3xl font-bold font-headline text-primary">Ξ 4.50</span>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <CatalogProductCard 
              id="2"
              title="SYNAPSE_EYE V.4"
              category="Bio-Hardware / Optics"
              priceStr="0.85"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gMWuukusfjgIbVpjc8MQIcDZhCvdIpEKN48AKNlPTqj2iDySkvTkyGaHXwpSqxDlFRzHkMKUcnYZ0M7ejGYMiQhPuPhH9WFbnkOl5A5153cHwuVJ9sCdmkSfqMNlfcnoSMf8KdEqq3RYJNOxys2-yRSSlR-PwkB2QIKGYJY61eh-rsCLMt57CNcGc3S-browobWHvF1mS2n_41YtXyzY9g6yAcERA8TC6e7cHs7NEw0fjXXbb-WqBd5onoCOITYKO9AgEx0g-v7k"
              badge={{ text: "Optic_Link", styleClass: "bg-surface-container-highest/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-secondary font-bold uppercase" }}
              buttonStyleClass="bg-secondary text-on-secondary hover:bg-secondary-fixed"
            />

            {/* Product Card 3 */}
            <CatalogProductCard 
              id="3"
              title="NEURO_DRIVE 500TB"
              category="Storage / Quantum"
              priceStr="1.20"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBnLgDdIv2_bPV8M5zbySsrr-VQ0ctuBU6YgVCj91C6ELSbSNwOTRTQEwtBPP5_uMkKqFWsgARX55K9l36PfKHMjNK31C4XYa7KEUj7nRdUTYH2M60tIFLuf9x79ntzL0m_ZHgtDgoWKvyIlNlMUlSYP1YpCFFNPLhRdmQnuqNBWKytKe_knQjULoRFAKEcHztdPAcsK61Bxiajo2y1m9Ph10iQ6w1r_evUXd7X6Gk1D1Yip6PK1B_D8yjE-YnmzQUNchhdFxkCpp9l"
              badge={{ text: "Trending", styleClass: "bg-primary/20 backdrop-blur-md border border-primary/30 px-2 py-1 rounded text-[10px] text-primary font-bold uppercase" }}
              buttonStyleClass="bg-primary text-on-primary hover:bg-primary-fixed"
            />

            {/* Product Card 4 */}
            <CatalogProductCard 
              id="4"
              title="LIQUID_LINK 2.0"
              category="Bio-Hardware / Link"
              priceStr="0.45"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCqXJYnH_nrPRuteZn9OS0VW9ItQDPQut928xqwLhvH_inMJlrmMEKS0ieoYh8_7ZHaYOuCPbAbBybdXUajGNfB6jTAT9XejSJZFNzyJ5Sxvszaqdf16GoTu4YzP1y68Ga2-uLrAgeyTcJb0fsoLHHLT8s5xMFVckMBoFqGq7pDPkNsp7lxKhyM7pCNEe95eYoLOBXxuTWgVe3hXYLz1_q90G1f6N9wYAfMGH34GTBI98cbyUV1g2TAb1INV1xbFCbyBCVDvNvmvSCU"
              buttonStyleClass="bg-primary text-on-primary hover:bg-primary-fixed"
            />

            {/* Product Card 5 */}
            <CatalogProductCard 
              id="5"
              title="KINETIC_ARM_GEN6"
              category="Hardware / Prosthetic"
              priceStr="3.10"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDW6z6Ykn90MgmwfqcCmnyXqCn-5fI5pVlP2oFqOu2VPCuv7d2znpDu9QTx48xs-I3Vvce51DQrg-kuSShrjjA_DHX-_9bhk1SOHtOszIGYubCcLrKkeQetN3JI-kHOfK78OSzCA-txA7s53i3JdQ_6iiD6wrj3YsHfEV4k2jts1MTtPhkTmgE0GAMShPzqqXzmX7zgJO1W9k28zReVQMplHUE9p0j5_8LO9BXQKbYJQmqX8OTrF8mOGhx80DAs_odOQk2fQLC2Sgkf"
              buttonStyleClass="bg-secondary text-on-secondary hover:bg-secondary-fixed"
            />

            {/* Product Card 6 */}
            <CatalogProductCard 
              id="6"
              title="ORBITAL_NET_MESH"
              category="Connectivity / Satellite"
              priceStr="1.95"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDwqcBtCK0Xfjp6hrieUzmcvQ6zJ9HIEJFQgahHwfeQdanJ6vI3h4b7G5uvwP4MyeXhEflZw7OZYE5ZtrtWy2Fedu_-cTFxX-rEw0Xe_kmZSulbzRptXz2sPELIvQXn1eak0TOEJrUdHCxH5UH8w0HD6BnRbOiEPOs1axvDS0eD-yANF9L45J3AdpE_uRIeeipgjeU73x5e_7DqlM5qAJOmmfx6PXyVPspakCuy0YWS7qlVfwhocxIVoOHpwJjG3mbN0PGvUGBiNUpg"
              badge={{ text: "Hot Release", styleClass: "bg-tertiary text-on-tertiary px-2 py-1 rounded text-[10px] font-bold uppercase" }}
              buttonStyleClass="bg-tertiary text-on-tertiary hover:opacity-80"
            />

            {/* Product Card 7 */}
            <CatalogProductCard 
              id="7"
              title="VOID_CELL_PRO"
              category="Processor / Modular"
              priceStr="0.65"
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCeKntfddYUcIZpd_Ci2cXyY3FMsGpAIqoeaQX_saNtj4NW4IIk5pK0deEeQA5dkNmZMXujtcIUJNw_w_jtQqqfRYJBZDXkP1lvBy6R2mIWcTaGYqJ8tgPiHfLAbA5MxIldwau5mm2jBQFe8_ZcHs_X9xa2lKjukqy7ojCscb_0p7vYETttvs3rE5UvZQRTsN2uw3YByPCZ6OKnTDTcaM4q2QtHXLkYxIdJuVMJoMHv15qnlWxiC_CJd7b0jFaDvKZ7h7ZDULIiJjZy"
              buttonStyleClass="bg-primary text-on-primary hover:bg-primary-fixed"
            />

          </div>
        </div>
      </main>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
