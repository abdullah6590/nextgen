'use client';

import { motion } from 'framer-motion';

export default function VisualSearchOverlay({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-surface-container-lowest/15 backdrop-blur-[40px] flex flex-col items-center justify-center p-6 md:p-12">
      {/* Header Controls */}
      <div className="absolute top-24 left-8 right-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-headline text-xs tracking-widest text-primary uppercase font-bold">Aetheris AI Active</span>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label text-sm uppercase tracking-tighter group">
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            <span className="group-hover:translate-x-1 transition-transform">Re-upload Asset</span>
          </button>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all group"
        >
          <span className="material-symbols-outlined text-on-surface group-hover:rotate-90 transition-transform duration-300">close</span>
        </button>
      </div>

      {/* Central Workspace */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left: Scanning Module */}
        <div className="lg:col-span-7 relative group">
          {/* Spatial Container */}
          <div className="relative bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 shadow-[0_0_80px_-20px_rgba(76,215,246,0.15)] aspect-[4/3] flex items-center justify-center">
            {/* The Uploaded Asset */}
            <img 
              alt="Uploaded Search Asset" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATfhH5Gel5p1mQciB21TKrkotDlMN0WtjnRNOM6pjtXn7VgBRwlOaT7iMbqvLeDJPXjj1VSfZEia-HgZuejdcpIIH00IwGeflqaV63koXaENCWVqGMJZN6Gs1XKCwhBxlrwrhUzYFFvkpSuYjc7IQs-Ql_1kJQyKnPPeOZcoizNgMLGDF-UTuJWJX-koTqCaSuFjni7rPKsLtr7XVWCN8i8oYMrmllzmvsUKz7puhPrTalA4B4O7g1TJh13lhjyxnUqv7SKQSh2NPW" 
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute inset-0 opacity-30" 
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(76, 215, 246, 0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(76, 215, 246, 0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              ></div>
              
              {/* Horizontal Scanning Bar */}
              <motion.div 
                animate={{ translateY: [0, 450, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_2px_rgba(76,215,246,0.8)]"
              ></motion.div>
              
              {/* UI HUD elements */}
              <div className="absolute top-6 left-6 flex flex-col gap-1">
                <span className="text-[10px] text-primary font-headline uppercase tracking-widest">Target_Acquired</span>
                <span className="text-[10px] text-on-surface-variant font-body opacity-60">REF_ID: 9942-X</span>
              </div>
              
              <div className="absolute bottom-6 right-6">
                <div className="bg-surface-container-highest/80 backdrop-blur-md px-4 py-2 rounded-md border-l-2 border-primary">
                  <span className="text-[10px] block text-on-surface-variant uppercase tracking-tighter mb-1">Processing Geometry</span>
                  <div className="w-32 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 animate-[pulse_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Semantic Insights */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">Visual DNA Parsing</h2>
            <p className="text-on-surface-variant font-body leading-relaxed">Neural network has identified structural patterns matching high-performance footwear. Analyzing textile mesh and propulsion plate architecture.</p>
          </div>
          
          {/* Attributes Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary-container/30 text-secondary px-4 py-1.5 rounded-full text-xs font-bold border border-secondary/20 uppercase tracking-widest">Neon_Synthetics</span>
            <span className="bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-bold border border-outline-variant/30 uppercase tracking-widest">Liquid_Mesh</span>
            <span className="bg-primary-container/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold border border-primary/20 uppercase tracking-widest">Aerodynamic</span>
          </div>
          
          {/* Match Data Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/10">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Color Cluster</span>
              <div className="flex gap-1.5 mt-2">
                <div className="w-6 h-6 rounded-full bg-[#131315] border border-outline-variant/30"></div>
                <div className="w-6 h-6 rounded-full bg-primary border border-outline-variant/30"></div>
                <div className="w-6 h-6 rounded-full bg-secondary border border-outline-variant/30"></div>
              </div>
            </div>
            <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/10">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Fabric Density</span>
              <span className="font-headline text-xl text-primary font-bold">88.4<span className="text-xs text-on-surface-variant ml-1">%</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll: Similar Assets */}
      <div className="absolute bottom-12 left-0 w-full px-8 lg:px-12 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline text-lg font-bold tracking-tighter uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">hub</span>
            Neural Matches Found
          </h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
          {/* Asset Card 1 */}
          <div className="flex-none w-64 group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-primary/50 transition-all duration-300">
              <div className="aspect-square">
                <img alt="Similar Asset 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgS-JzbYqY_nMaP-mxHXxB60dZCphCTHMJ7ytt_fV-Q6hxXcxTURHD2OsoUN7dUJXhWfqlEf8UWE0q70I1KaCT7XodYwhHhaxXi1pvfJt5wQljNVfq4LSelFABdJp8K4RnH1f6Dchj-BFI28EpoTkntxrK9N3VpDklmqRmhbMhXFGzWOOrq8mEbj1qjFuC0TU2nnXe8ybdvfvWjoEqTechbCiMgKfwo8R4Jg326Inn3X6zL0veDQFsTc5_TB-h4ERjOpSlI0z7PktA" />
              </div>
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded border border-primary/30">
                <span className="text-[10px] font-bold text-primary font-headline">98.2% MATCH</span>
              </div>
              <div className="p-4 bg-gradient-to-t from-background to-transparent">
                <h4 className="font-headline text-sm font-bold truncate">ION_STRIKE ZERO</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Vendor: Aether_Core</p>
              </div>
            </div>
          </div>
          
          {/* Asset Card 2 */}
          <div className="flex-none w-64 group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-primary/50 transition-all duration-300">
              <div className="aspect-square">
                <img alt="Similar Asset 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV4vItnBfQKNI_xbQQCdhE1-2M74NgVSU-1ywzQaYMagA6mgQ-BdnzBklrYju-x5ieEEM0a5Rxg_GFWce5DgxahgekDIb-n63jMrCWPvvBV312JDImXzJLCOSDivzTi5_y9QqJV4Ux0mU6d8Y1HWjBC2lOQgyCbUeEwe2q3f7LXF9Y_1Ug0Tp9Cyn86m4YK3XNErLWc9JssCUJAvrn-GMdSi971psE2Chv2mnbq2cJtlxZwTU6EOfaCpfmi3DIqoEpIHbVZcgWU3cg" />
              </div>
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded border border-secondary/30">
                <span className="text-[10px] font-bold text-secondary font-headline">94.7% MATCH</span>
              </div>
              <div className="p-4 bg-gradient-to-t from-background to-transparent">
                <h4 className="font-headline text-sm font-bold truncate">NEBULA FLOW II</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Vendor: Zenith_Labs</p>
              </div>
            </div>
          </div>

          {/* Asset Card 3 */}
          <div className="flex-none w-64 group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-primary/50 transition-all duration-300">
              <div className="aspect-square">
                <img alt="Similar Asset 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjyQrUK8Pjztp9V2ojwB9oh3ZFWGjNiWv_9nLtUhqEwCjFp-ApN3DkX0kY0zZGv0hyuCe4vep-J12CkB8ktuJ3xamYDEqZ6J0twQPz_wBtsR8YNwIPVNwwteUFmLZHDkoxcB4CTzctjEc8obMtxxLcy9uiFHReXIZPWj9R3OBLXu2nz6EXlp-tKi3sy1nXZtHYG2L76uEaoRdYRmygRTqXpxaNUGFUovqEf6fLonNwr4HmNSqG18rW_aPC-CJszoIgTcVo4-Lnyp9k" />
              </div>
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded border border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant font-headline">89.1% MATCH</span>
              </div>
              <div className="p-4 bg-gradient-to-t from-background to-transparent">
                <h4 className="font-headline text-sm font-bold truncate">VOID RUNNER X</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Vendor: Dark_Matter</p>
              </div>
            </div>
          </div>

          {/* Asset Card 4 */}
          <div className="flex-none w-64 group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-primary/50 transition-all duration-300">
              <div className="aspect-square">
                <img alt="Similar Asset 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgAqCi10bJtpNN8UcwnZGEtGLa7ZiMo881hK-jMrmiPJm6eQMrBhOwGbF6hBRrznYUnwmF8AY6GU0_epyE5PmKEn5KszZsZfWhdCiJmAyQBn9-2U56zt_F-LEnaSDAIHvuK015kOJoChl-h2xROe6RJfr2PnDwGgh4rw11lKJt3IyicgLYsmSzTXbl8ZJ0G-M9plqc3ffYeqqk-CZcKo9_HccDZSdtfcEx7KJZmEzWsI_iN_Rs6OCZ0DPJILfbMbbOZ5v4255qZdQu" />
              </div>
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded border border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant font-headline">85.5% MATCH</span>
              </div>
              <div className="p-4 bg-gradient-to-t from-background to-transparent">
                <h4 className="font-headline text-sm font-bold truncate">CYBER TRACE V1</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Vendor: Neural_Sync</p>
              </div>
            </div>
          </div>

          {/* Asset Card 5 */}
          <div className="flex-none w-64 group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-primary/50 transition-all duration-300">
              <div className="aspect-square">
                <img alt="Similar Asset 5" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV7jQTmUAJW9-ie-XG3vzvV9iVtkK2Fn-_dlXbZm8JW27XCfDwprICzTSDQPhtydjs1oITc7XFjk5CtLQAfhjq5kA3Y8O9yV778QkkqLvtElQfgu8UzZQHc91B8VAy3mRzhyPV05EfytUbPpyj-Rnv4JDibZ3Wn1wjbV2vWXVw53tUuvCr8HZZJ5RiAf_zs8a8uw3pcLzzk8v3-X3gq_SHRid5fWdSTGZgFR7PjyZLftXXFlaJjYxv7A3QkQAapi_21mL7KsGR190h" />
              </div>
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded border border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant font-headline">82.3% MATCH</span>
              </div>
              <div className="p-4 bg-gradient-to-t from-background to-transparent">
                <h4 className="font-headline text-sm font-bold truncate">ORBIT FLEX PRO</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Vendor: Galactic_Fulfillment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
