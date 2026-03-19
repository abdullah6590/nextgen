import Link from 'next/link';

const PRODUCT_CATALOG: Record<string, { title: string, category: string, imageSrc: string, stock: number, metricText: string, description: string }> = {
  'neural-core-v2': {
    title: 'NEURAL_CORE_V2',
    category: 'Genesis Core Architecture',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnHt7L0-cjAzxH9tNsDGNj9wRDtAS1lFmZd-5er56LZ4z1gAFRaI56PI2FitFkk3wuwLg75QXFCfqdc2TAZY6kk1oMUO0GtyXf37kSJFViV0FVNMOBp-13DjQ7f2YRW5RPd-5fAjw8V5hDC0cFS9WnCQ-pRD1d23LCxFb-yE4s1w2ygAm9yC2SzijDcX4e6Zkml8T-l8JnMyBIl7PefLRrADu8Li7Otyt3u6tFP67uwZljn2VH3F_wVo7-0BADLXzEL2PFdjfMHbkG',
    stock: 12,
    metricText: 'Units available',
    description: 'Predicted outage in 14 hours. Liquid-cooled quantum lattice processing unit with 4.2 Exaflops of native AI throughput.'
  },
  'plasma-drive-8k': {
    title: 'PLASMA_DRIVE_8K',
    category: 'High-Fidelity Propulsor Array',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYg3MLCZzaEhLC9vGyi-A0jJah_1MXja3CP6WOebzBr6lOMg-uq4z0GoYPP3_YhPFYSENh4uadYTV9oIpwJrW2uAGF_2hNNnVCfKF1dXQPlIJF2y0jMibn8wCqFLJAaiDj_Wp_5yi24LneCWyzVR3XM3vV31B8YHfKEBcr9scJ5dd98OzbfZt0WyobW_1y2-hub2jCEwxuNRMHnA-K0WyKULBJa362JWVmcmYFSE0QhEQxpQWClxEMv6lSL7h8vDYOhj6TGGIDu0l',
    stock: 88,
    metricText: 'Units available',
    description: 'Next restock window: 4 days. Optimal plasma containment rotation.'
  },
  'qubit-processor': {
    title: 'QUBIT PROCESSOR',
    category: 'Quantum Rotation Module',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwmReEKjcpM9HPlN8ct6teX9tOLcNNfOUl3M1giCOWilk8CdqN187cIwjHgVCYcSXyUyBEcki5C8hSiw7_sDiQDvNlh9xwti7M-pxN_cKBmi5GMJAQblybnwDsVLwTzqaJrp3lEGzkC0uqcs0qYwzMQNwBGxvckvsIQnTQPPhvc88Ci0v5PCsBBwhrq2Y_whsmMe3Hxi1WmCDWKbCMISfHcPK2Y8ZlGapqEvMiExafkCVf1FbGgrz04gg5RS8znyHmu1CVdgSMS6H8',
    stock: 64,
    metricText: 'Units available',
    description: 'Healthy rotation status detected. Entanglement metrics stable across all sub-nodes.'
  },
  'iridescent-mesh-kit': {
    title: 'IRIDESCENT MESH',
    category: 'Procedural Materials',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0kL0OVc4DTI5hZ1_sYW3t4MxQrpudSwaD79qPf8w16b0gibEsdps4OaLyZEFW2eG5PjkjOjjAU8hKCvhFPo9lC77gQzEg0jOeKEFUuR3oUe7NASDiKZgRhcVU5q1TH2tgcbVU1kf_CayrCWEwEWxaXLOVpchGKMGhnC5kiiubSfvqi6GpMlHymLu9ufHq1FJVW5ewSBGsqoANc7DTaaLEx_eoyQCqDc1Kan0i87b9bc0lNfn6mrgBymgvaQzcRw62UqS_PgEjr5Zm',
    stock: 99,
    metricText: '% Match Accuracy',
    description: 'High-fidelity procedural material kit. Contains natively generated neural textures with absolute hyper-realistic irradiance.'
  },
  'neo-tokyo-enviro': {
    title: 'NEO-TOKYO ENVIRO',
    category: 'Real-time Scene Core',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnUssltF04v92j3XMPmRKSqs8u_bDolyYBBWuEXCfTkbIjHbSZKO8Gn7b3Of6GJVFTyo6sdIHOW_Y9FFLg5AENvJP3LHFSQ-iYF4l_JHDG9ERYmQEauipMqEjTBiIaklARI1lTRkwmfBp-FgJ6X6ai4QTQ2Xv09hApC6T9tujWSfvLtXPBc-ewuLdib9n8zI8FcTRzs_mxQ3IItWzbP2HvQALEbqwO095-ii94G-b1ExTlKQeyCuyRiQyMmIqUOjydrjpLqpW1nZLM',
    stock: 98,
    metricText: '% Match Accuracy',
    description: 'Fully integrated Neo-Tokyo architectural environment utilizing decentralized blockchain verification rendering sequences.'
  }
};

export default async function ProductDeepDive({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productKey = resolvedParams.id ? resolvedParams.id.toLowerCase() : 'neural-core-v2';
  const product = PRODUCT_CATALOG[productKey] || {
    ...PRODUCT_CATALOG['neural-core-v2'],
    title: resolvedParams.id.toUpperCase().replace('-', ' ')
  };

  return (
    <div className="bg-[#131315] text-[#e5e1e4] font-body selection:bg-[#d0bcff]/30 min-h-screen">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(19, 19, 21, 0.15); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .tonal-shift { background: linear-gradient(to bottom, #131315, #0e0e10); }
        .neon-glow-violet { box-shadow: 0 0 15px rgba(208, 188, 255, 0.1); }
        .neon-glow-cyan { box-shadow: 0 8px 32px 0 rgba(76, 215, 246, 0.08); }
        @keyframes pulse-cyan { 0%, 100% { box-shadow: 0 0 15px rgba(76, 215, 246, 0.4), 0 0 30px rgba(76, 215, 246, 0.2); } 50% { box-shadow: 0 0 25px rgba(76, 215, 246, 0.7), 0 0 50px rgba(76, 215, 246, 0.4); } }
        @keyframes pulse-violet { 0%, 100% { box-shadow: 0 0 15px rgba(208, 188, 255, 0.4), 0 0 30px rgba(208, 188, 255, 0.2); } 50% { box-shadow: 0 0 25px rgba(208, 188, 255, 0.7), 0 0 50px rgba(208, 188, 255, 0.4); } }
        .glow-pulse-cyan { animation: pulse-cyan 3s infinite ease-in-out; }
        .glow-pulse-violet { animation: pulse-violet 3s infinite ease-in-out; }
      `}} />

      {/* Top Navigation Anchor */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/15 backdrop-blur-xl border-b border-[#4cd7f6]/10 shadow-[0_8px_32px_0_rgba(76,215,246,0.08)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
          <Link href="/" className="text-2xl font-black tracking-tighter text-[#4cd7f6] font-headline uppercase">NEURAL_ARC</Link>
          <div className="hidden md:flex items-center gap-12">
            <Link className="text-[#4cd7f6] border-b-2 border-[#4cd7f6] pb-1 font-headline tracking-tight uppercase" href="/">Storefront</Link>
            <Link className="text-slate-400 hover:text-[#4cd7f6] transition-colors font-headline tracking-tight uppercase" href="#">Visual Search</Link>
            <Link className="text-slate-400 hover:text-[#4cd7f6] transition-colors font-headline tracking-tight uppercase" href="/">Vendors</Link>
            <Link className="text-slate-400 hover:text-[#4cd7f6] transition-colors font-headline tracking-tight uppercase" href="#">Analytics</Link>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-[#4cd7f6] transition-all duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="text-slate-400 hover:text-[#4cd7f6] transition-all duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined">smart_toy</span>
            </button>
            <div className="w-10 h-10 rounded-full border border-[#4cd7f6]/20 overflow-hidden bg-[#2a2a2c]">
              <img alt="User Neural Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy1PiqlAxEKDb59OF_RW385I9g3Ebmj7gFIoZJIfaeh7y735x5UTQmPwpEUK5aLODyDzLNAHL--M4Z37T2T7QCTrrigc_eKvICV_ArCt63fwTjCTwgJ4gANtZhN5nCaB3Z7lUGyDu3uRDXJtCkPxK2S5ceVZBj0vRiZtNMC_E7kCFdeQ1PIbAgugdQI1Ww5woCM0RfTTIUqUa9YMYTN1qP9LaU6GWkvYSq-QPtvwmLHxnJpBcEpvwSS39vdU6m0ssr1qxP_29Xexdl"/>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-24 pb-12 px-8 min-h-screen grid grid-cols-12 gap-8 max-w-[1920px] mx-auto relative overflow-hidden">
        {/* Left Section: 3D Asset Preview */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[819px] bg-[#0e0e10] rounded-[24px] overflow-hidden border border-[#3d494c]/10 group">
            <img alt={product.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]" src={product.imageSrc}/>
            <div className="absolute bottom-8 left-8 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#4cd7f6]">Live Neural Render</span>
              </div>
              <h1 className="text-6xl font-black font-headline tracking-tighter text-white uppercase leading-none">{product.title}</h1>
              <p className="text-[#bcc9cd] font-medium tracking-wide">Series v.4 // {product.category}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-[#4cd7f6]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-80 h-80 border border-[#d0bcff]/10 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
            </div>
          </div>
        </section>

        {/* Middle Section: Product Details & Metrics */}
        <section className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-[24px] border border-[#3d494c]/20 neon-glow-violet">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Stock Status</p>
                <h3 className="text-xl font-headline font-bold text-white uppercase">Real-Time Sync</h3>
              </div>
              <span className="material-symbols-outlined text-[#d0bcff]">database</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-headline font-bold text-[#4cd7f6]">{product.stock}</span>
              <span className="text-[#bcc9cd] text-sm pb-1">{product.metricText}</span>
            </div>
            <div className="w-full h-1.5 bg-[#353437] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] rounded-full shadow-[0_0_10px_#4cd7f6]" style={{ width: `${Math.min(product.stock, 100)}%` }}></div>
            </div>
            <p className="mt-3 text-[10px] text-[#bcc9cd] italic">Kafka cluster: us-east-1a-prod // Latency: 4ms</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#1c1b1d] p-6 rounded-[24px] border border-[#3d494c]/10 hover:border-[#4cd7f6]/40 transition-all cursor-default group hover:-translate-y-1 hover:scale-[1.01]">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-md bg-[#4cd7f6]/10 text-[#4cd7f6]">
                  <span className="material-symbols-outlined">memory</span>
                </div>
                <span className="font-headline font-bold tracking-tight text-lg uppercase">Core Processing</span>
              </div>
              <p className="text-sm text-[#bcc9cd] leading-relaxed">{product.description}</p>
            </div>
            <div className="bg-[#1c1b1d] p-6 rounded-[24px] border border-[#3d494c]/10 hover:border-[#d0bcff]/40 transition-all cursor-default group hover:-translate-y-1 hover:scale-[1.01]">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-md bg-[#d0bcff]/10 text-[#d0bcff]">
                  <span className="material-symbols-outlined">shield_moon</span>
                </div>
                <span className="font-headline font-bold tracking-tight text-lg uppercase">Neural Shield</span>
              </div>
              <p className="text-sm text-[#bcc9cd] leading-relaxed">Integrated biometric encryption using decentralized blockchain verification layers.</p>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <button className="w-full py-5 rounded-full bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.2em] scale-100 hover:scale-[1.05] active:scale-95 transition-all duration-300 glow-pulse-cyan flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">shopping_cart</span> ADD TO CART
            </button>
            <button className="w-full py-5 rounded-full bg-[#d0bcff] text-[#3c0091] font-headline font-black uppercase tracking-[0.2em] scale-100 hover:scale-[1.05] active:scale-95 transition-all duration-300 glow-pulse-violet flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">payments</span> PURCHASE NOW
            </button>
            <button className="w-full py-3 mt-2 rounded-full glass-panel border border-[#4cd7f6]/20 text-[#4cd7f6]/60 font-headline font-bold uppercase tracking-[0.1em] hover:text-[#4cd7f6] hover:border-[#4cd7f6]/50 transition-all flex items-center justify-center gap-2 text-xs">
              <span className="material-symbols-outlined text-sm">analytics</span> AI Analysis Report
            </button>
          </div>
        </section>

        {/* Right Section: AI Stylist Sidebar */}
        <section className="col-span-12 lg:col-span-3 flex flex-col bg-[#0e0e10]/50 backdrop-blur-md rounded-[24px] border border-[#3d494c]/10 overflow-hidden neon-glow-violet h-[819px] sticky top-24">
          <div className="p-6 border-b border-[#3d494c]/10 flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#571bc1] flex items-center justify-center text-[#d0bcff]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#eec200] rounded-full border-2 border-[#131315]"></div>
            </div>
            <div>
              <h4 className="font-headline font-bold text-white uppercase tracking-tight">AI Stylist</h4>
              <p className="text-[10px] text-[#eec200] font-bold tracking-widest uppercase">Consultant Online</p>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-[#571bc1]/20 p-4 rounded-xl rounded-tl-none border border-[#d0bcff]/20">
                <p className="text-sm text-white leading-relaxed">Greetings, Architect. The {product.title} perfectly complements your existing workflow. Shall I simulate the integration?</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">09:41 AM</span>
            </div>
            <div className="flex flex-col gap-2 max-w-[85%] ml-auto items-end">
              <div className="bg-[#353437] p-4 rounded-xl rounded-tr-none border border-[#3d494c]/20">
                <p className="text-sm text-white leading-relaxed">What's the latency impact on visual search tasks?</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">09:42 AM</span>
            </div>
            <div className="flex flex-col gap-2 max-w-[85%]">
              <div className="bg-[#571bc1]/20 p-4 rounded-xl rounded-tl-none border border-[#d0bcff]/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span className="text-[10px] uppercase font-bold text-[#d0bcff]">AI Calculation Complete</span>
                </div>
                <p className="text-sm text-white leading-relaxed">Predicted latency reduction is <span className="text-[#4cd7f6] font-bold">22.4%</span> due to the dedicated vector sub-processor.</p>
              </div>
              <span className="text-[10px] text-slate-600 uppercase">09:42 AM</span>
            </div>
          </div>
          
          <div className="p-6 bg-[#1c1b1d] border-t border-[#3d494c]/10">
            <div className="relative">
              <input className="w-full bg-[#0e0e10] border border-[#3d494c]/20 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-[#d0bcff] transition-all placeholder:text-slate-600" placeholder="Consult the AI Architect..." type="text"/>
              <button className="absolute right-2 top-1.5 w-9 h-9 bg-[#d0bcff] rounded-full text-[#3c0091] flex items-center justify-center hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-12 px-8 mt-auto bg-[#0e0e10] border-t border-[#4cd7f6]/10 flex flex-col items-center gap-6">
        <div className="flex gap-12">
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">Privacy Protocol</Link>
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">Terms of Service</Link>
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">API Docs</Link>
          <Link className="text-slate-600 hover:text-[#d0bcff] transition-colors font-body text-[10px] tracking-widest uppercase" href="#">Neural Network Status</Link>
        </div>
        <p className="text-slate-600 font-body text-[10px] tracking-widest uppercase">© 2024 NEURAL ARCHITECT. ALL ASSETS RENDERED IN 8K.</p>
      </footer>
    </div>
  );
}
