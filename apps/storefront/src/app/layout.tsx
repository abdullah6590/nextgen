import './global.css';
import { Inter } from 'next/font/google';
import { Providers } from '../components/Providers';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Nextgen | Futuristic E-Commerce',
  description: 'The future of online shopping is here.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Providers>
          {/* Futuristic Background Elements */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/20 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/20 blur-[120px] rounded-full mix-blend-screen" />
          </div>

          <Navbar />
          <CartDrawer />

          {/* Main Content */}
          <main className="flex-grow z-10 pt-20 relative">
            {children}
          </main>

          {/* Footer */}
          <footer className="z-10 bg-surface border-t border-[rgba(255,255,255,0.05)] relative overflow-hidden">
            {/* Subtle glow decoration */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="text-xl font-bold tracking-widest text-white">NEXT<span className="text-neon-blue">GEN</span></span>
                  <p className="text-xs text-text-sub font-mono tracking-widest uppercase opacity-50">
                    Powering the future of commerce
                  </p>
                </div>

                <div className="flex items-center gap-8">
                  <a href="/products" className="text-xs text-text-sub hover:text-neon-blue transition-colors uppercase tracking-widest">Catalog</a>
                  <a href="/login" className="text-xs text-text-sub hover:text-neon-blue transition-colors uppercase tracking-widest">Login</a>
                  <a href="/register" className="text-xs text-text-sub hover:text-neon-purple transition-colors uppercase tracking-widest">Register</a>
                </div>

                <p className="text-xs text-text-sub opacity-40 font-mono">© 2026 Nextgen. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
