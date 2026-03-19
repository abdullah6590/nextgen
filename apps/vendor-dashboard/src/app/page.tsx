'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  return (
    <div className="font-body selection:bg-primary/30 bg-background text-on-surface min-h-screen">
      {/* SideNavBar */}
      <nav className="h-screen w-64 fixed left-0 top-0 border-r border-cyan-500/5 bg-[#0e0e10] flex flex-col py-8 px-4 z-40">
        <div className="text-lg font-bold text-cyan-400 mb-8 font-headline tracking-tighter">NEURAL_VNDR</div>
        <div className="flex items-center gap-3 p-4 mb-8 bg-surface-container-low rounded-lg border border-outline-variant/10">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="material-symbols-outlined text-primary">monitoring</span>
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface uppercase tracking-widest">Aetheris AI</p>
            <p className="text-[10px] text-primary/70">AI Status: Optimal</p>
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <a className="flex items-center gap-3 bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-400 px-4 py-3 mb-2 font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Command Center</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            <span>Inventory</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined" data-icon="hub">hub</span>
            <span>Live Traffic</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined" data-icon="storefront">storefront</span>
            <span>Marketplace</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
            <span>Neural Labs</span>
          </a>
        </div>
        <div className="mt-auto pt-8 border-t border-outline-variant/10 space-y-1">
          <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-xs uppercase tracking-widest mb-6 active:scale-95 transition-transform">
            Deploy Asset
          </button>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-[#131315] font-medium text-sm" href="#">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            <span>Settings</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-[#131315] font-medium text-sm" href="#">
            <span className="material-symbols-outlined" data-icon="help_center">help_center</span>
            <span>Support</span>
          </a>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen p-8 lg:p-12">
        <motion.div variants={container} initial="hidden" animate="show">
          <header className="mb-12">
            <motion.h1 variants={item} className="font-headline text-4xl font-black tracking-tighter text-on-surface mb-8">COMMAND_CENTER.SYS</motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Sales */}
              <motion.div variants={item} className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/20 flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:border-outline-variant/40 transition-all duration-300 shadow-oled-primary">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Total Sales</span>
                  <span className="material-symbols-outlined text-primary/50" data-icon="payments">payments</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl font-bold text-on-surface">$1.24M</span>
                  <span className="text-primary text-xs font-bold">+12.4%</span>
                </div>
              </motion.div>
              {/* Vendor Rank */}
              <motion.div variants={item} className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/20 flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:border-outline-variant/40 transition-all duration-300 shadow-oled-secondary">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-secondary tracking-widest uppercase">Vendor Rank</span>
                  <span className="material-symbols-outlined text-secondary/50" data-icon="military_tech">military_tech</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl font-bold text-on-surface">#04</span>
                  <span className="text-secondary text-xs font-bold">Top 1%</span>
                </div>
              </motion.div>
              {/* AI Recommendations */}
              <motion.div variants={item} className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/20 flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:border-outline-variant/40 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">AI Insights</span>
                  <span className="material-symbols-outlined text-on-surface-variant/50" data-icon="auto_awesome">auto_awesome</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl font-bold text-on-surface">24</span>
                  <span className="text-on-surface-variant text-xs font-medium">Pending Action</span>
                </div>
              </motion.div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6">
            {/* Revenue Analytics Chart */}
            <motion.div variants={item} className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/20 relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Revenue Velocity</h3>
                  <p className="text-sm text-on-surface-variant">Real-time throughput analytics</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-surface-container-high rounded-full text-xs font-bold text-primary border border-primary/20">WEEKLY</button>
                  <button className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors">MONTHLY</button>
                </div>
              </div>
              <div className="h-64 w-full flex items-end gap-1 relative">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 256">
                  <defs>
                    <linearGradient id="cyan-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 256 L0 100 Q 100 80 200 150 T 400 50 T 600 120 T 800 30 T 1000 80 L 1000 256 Z" fill="url(#cyan-grad)"></path>
                  <path d="M0 100 Q 100 80 200 150 T 400 50 T 600 120 T 800 30 T 1000 80" fill="none" stroke="#4cd7f6" strokeWidth="3"></path>
                </svg>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 256">
                  <path d="M0 150 Q 150 180 300 120 T 600 160 T 900 100 T 1200 140" fill="none" opacity="0.4" stroke="#d0bcff" strokeDasharray="8 4" strokeWidth="2"></path>
                </svg>
              </div>
              <div className="grid grid-cols-5 mt-4">
                <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">MON</div>
                <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">TUE</div>
                <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter text-center">WED</div>
                <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter text-right">THU</div>
                <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter text-right">FRI</div>
              </div>
            </motion.div>

            {/* Smart Inventory Alerts */}
            <motion.div variants={item} className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/20 border-l-4 border-l-tertiary">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary" data-icon="warning">warning</span>
                <h3 className="font-headline text-xl font-bold text-on-surface">Critical Inventory</h3>
              </div>
              <div className="space-y-6">
                <Link href="/product/neural-core-v2" className="block p-4 bg-surface-container-high rounded-lg border border-tertiary/20 hover:border-tertiary transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">NEURAL_CORE_V2</span>
                    <span className="text-xs font-bold text-tertiary whitespace-nowrap">LOW STOCK</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-[12%]"></div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2">Predicted outage in 14 hours</p>
                </Link>
                <Link href="/product/plasma-drive-8k" className="block p-4 bg-surface-container-high rounded-lg border border-outline-variant/10 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">PLASMA_DRIVE_8K</span>
                    <span className="text-xs font-bold text-on-surface-variant whitespace-nowrap">OPTIMAL</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[88%]"></div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2">Next restock window: 4 days</p>
                </Link>
                <Link href="/product/qubit-processor" className="block p-4 bg-surface-container-high rounded-lg border border-outline-variant/10 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">QUBIT_PROCESSOR</span>
                    <span className="text-xs font-bold text-on-surface-variant whitespace-nowrap">OPTIMAL</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[64%]"></div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2">Healthy rotation</p>
                </Link>
              </div>
              <button className="w-full mt-8 py-3 text-xs font-bold text-on-tertiary-container bg-tertiary rounded-full hover:brightness-110 transition-all uppercase tracking-widest">
                Automate Restock
              </button>
            </motion.div>

            {/* Live Traffic Map Tile */}
            <motion.div variants={item} className="col-span-12 lg:col-span-12 bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/20 min-h-[400px] relative overflow-hidden mt-6 shadow-oled-primary">
              <div className="flex justify-between items-start mb-8 z-10 relative">
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-tight">Global Inbound Nodes</h3>
                  <p className="text-sm text-primary font-bold">Live Traffic Tracking • 14,281 Active Sessions</p>
                </div>
                <div className="flex items-center gap-4 bg-surface-container-highest px-4 py-2 rounded-full text-xs font-bold">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  LIVE SYNC
                </div>
              </div>
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img alt="Abstract dark world map grid" className="w-full h-full object-cover" data-alt="Digital dark world map with neon data grid" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiL2VT19K5vXuB0B5Osyc55vrpbGmOm7122jgxbKCe-xONeToHd5AJal1tlYUv4_fBJH0-8CWvjWwuW744LBOw4P33E6Ap4ePvdwjGdN9QM3MFGnhFURhCBks327YvcltywX04Xg6DwLlFEjcggc-k52H3_4OKmAoO3XEl4LDOsrOu-iFnuKTHG-64m47iCtHpVd0zlY9h9QN0WgMBAYebUsEVY2kFyxZMJKicHeDvWSdtDFvaygLg9-mD7J9ebQ_ygX0E7Ruf617B"/>
              </div>
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4">
                  <div className="h-4 w-4 bg-primary rounded-full blur-[2px] animate-ping opacity-75"></div>
                  <div className="h-4 w-4 bg-primary rounded-full absolute inset-0"></div>
                  <div className="absolute top-6 left-2 bg-surface p-2 rounded-lg border border-primary/30 text-[10px] font-bold">SAN_FRAN: 2.4k</div>
                </div>
                <div className="absolute bottom-1/3 left-1/2">
                  <div className="h-4 w-4 bg-secondary rounded-full blur-[2px] animate-ping opacity-75"></div>
                  <div className="h-4 w-4 bg-secondary rounded-full absolute inset-0"></div>
                  <div className="absolute top-6 left-2 bg-surface p-2 rounded-lg border border-secondary/30 text-[10px] font-bold">LONDON_CORE: 5.1k</div>
                </div>
                <div className="absolute top-1/2 right-1/4">
                  <div className="h-4 w-4 bg-primary rounded-full blur-[2px] animate-ping opacity-75"></div>
                  <div className="h-4 w-4 bg-primary rounded-full absolute inset-0"></div>
                  <div className="absolute top-6 left-2 bg-surface p-2 rounded-lg border border-primary/30 text-[10px] font-bold">TOKYO_VNDR: 6.7k</div>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Peak Node</p>
                    <p className="text-xl font-headline font-bold text-on-surface">TOKYO_01</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Latency</p>
                    <p className="text-xl font-headline font-bold text-primary">12ms</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-surface/15 backdrop-blur-xl border border-primary/20 rounded-full text-xs font-bold text-primary hover:bg-primary/10 transition-colors uppercase tracking-widest">
                  Expand Matrix View
                </button>
              </div>
            </motion.div>
          </div>

          <footer className="w-full py-12 mt-16 flex flex-col items-center gap-6 border-t border-cyan-500/10">
            <div className="flex gap-8 text-slate-600 text-[10px] tracking-widest uppercase">
              <a className="hover:text-violet-400 transition-colors" href="#">Privacy Protocol</a>
              <a className="hover:text-violet-400 transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-violet-400 transition-colors" href="#">API Docs</a>
              <a className="hover:text-violet-400 transition-colors" href="#">Neural Network Status</a>
            </div>
            <p className="text-slate-600 text-[10px] tracking-widest uppercase">© 2024 NEURAL ARCHITECT. ALL ASSETS RENDERED IN 8K.</p>
          </footer>
        </motion.div>
      </main>
    </div>
  );
}
