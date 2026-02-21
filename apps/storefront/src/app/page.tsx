export default function Index() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center px-6 overflow-hidden min-h-[80vh]">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtbmgtdmhoMzh2NGgtMzh2M2gtNHYtM2gtOHYtNGg4di0yNGgtOHYtNGg4di0zaDR2M2gzOHY0aC0zOHYyNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvZz48L3N2Zz4=')] opacity-20 mask-image-gradient absolute inset-0 mix-blend-overlay"></div>
        
        {/* Holographic Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-hero-glow rounded-full mix-blend-screen animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto mt-[-10vh]">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-neonPurple/50 bg-neonPurple/10 text-neonPurple text-xs font-bold tracking-[0.2em] uppercase">
            Entering the Next Dimension
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-tight">
            ELEVATE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue via-neonPurple to-neonPink animate-float inline-block">
              DIGITAL ARSENAL
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-textSub mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover cutting-edge tech, cyber-enhancements, and futuristic gear. Experience seamless transactions powered by our advanced microservice architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/products" className="btn-neon-primary w-full sm:w-auto">
              Initialize Uplink
              <svg className="w-5 h-5 inline-block ml-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </a>
            <a href="/login" className="btn-neon-secondary w-full sm:w-auto">
              Authenticate
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 hidden lg:block opacity-50">
          <div className="text-[10px] font-mono tracking-widest text-neonBlue mb-1">SYS.STATUS // OPTIMAL</div>
          <div className="w-32 h-1 bg-surfaceHover overflow-hidden rounded">
            <div className="w-full h-full bg-neonBlue animate-pulse-slow"></div>
          </div>
        </div>
        
        <div className="absolute bottom-10 right-10 hidden lg:block opacity-50 text-right">
          <div className="text-[10px] font-mono tracking-widest text-neonPurple mb-1">NODE // CONNECTED</div>
          <div className="flex gap-1 justify-end">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-1 h-3 bg-neonPurple" style={{ opacity: Math.random() * 0.5 + 0.5, animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Categories/Stats (placeholder) */}
      <section className="relative z-10 -mt-20 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Neural Interfaces', 'Quantum Components', 'Cyberwear'].map((cat, i) => (
             <div key={i} className="glass-panel p-8 group cursor-pointer hover:border-neonBlue/50 transition-colors">
               <div className="w-12 h-12 rounded bg-surfaceHover flex items-center justify-center mb-6 group-hover:bg-neonBlue/20 transition-colors">
                 <span className="text-neonBlue font-mono text-xl">0{i+1}</span>
               </div>
               <h3 className="text-xl font-bold mb-2 tracking-wide uppercase">{cat}</h3>
               <p className="text-textSub text-sm">Next-generation hardware for the modern netrunner.</p>
               <div className="mt-6 flex items-center text-neonBlue text-sm font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 transition-transform">
                 Browse <span className="ml-2">→</span>
               </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
