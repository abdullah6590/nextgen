import './global.css';
import { Providers } from '../components/Providers';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';

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
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Providers>
          {/* Futuristic Background Elements */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonPurple/20 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neonBlue/20 blur-[120px] rounded-full mix-blend-screen" />
          </div>

          <Navbar />
          <CartDrawer />

          {/* Main Content */}
          <main className="flex-grow z-10 pt-20 relative">
            {children}
          </main>

          {/* Footer */}
          <footer className="z-10 bg-surface border-t border-[rgba(255,255,255,0.05)] py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold tracking-widest text-white">NEXT<span className="text-neonBlue">GEN</span></span>
              </div>
              <p className="text-sm text-textSub">© 2026 Nextgen E-Commerce. The Future is Now.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
