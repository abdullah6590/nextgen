import Link from 'next/link';
import { Home, Package, Zap, ShoppingCart, Settings, LogOut } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Overview', href: '/' },
  { icon: Package, label: 'Manage Products', href: '/products' },
  { icon: Zap, label: 'AI Insights', href: '/insights' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
];

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neonCyan to-neonBlue flex items-center justify-center shadow-neon-cyan">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">VENDOR<span className="text-neonCyan">HUB</span></span>
      </div>

      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-textSub hover:text-white hover:bg-white/10 transition-all group"
          >
            <item.icon className="w-5 h-5 group-hover:text-neonCyan transition-colors" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-textSub hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-neonPink/60 hover:text-neonPink hover:bg-neonPink/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
