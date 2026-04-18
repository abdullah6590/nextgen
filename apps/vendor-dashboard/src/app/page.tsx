'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { vendorApi } from '../lib/vendorApi';
import { ProductFormModal } from '../components/ProductFormModal';
import { useVendorAuth } from '../lib/VendorAuthContext';

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

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  createdAt: string;
}

interface Order {
  id: number;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: { productId: string; quantity: number; price: number }[];
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading, user, logout } = useVendorAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [productsData, ordersData] = await Promise.allSettled([
        vendorApi.getProducts(),
        vendorApi.getVendorOrders(),
      ]);

      if (productsData.status === 'fulfilled') {
        setProducts(productsData.value);
      }
      if (ordersData.status === 'fulfilled') {
        setOrders(ordersData.value);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Computed stats from real data
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 10);
  const recentOrders = orders.slice(0, 5);

  const handleProductAdded = () => {
    setShowAddProduct(false);
    fetchData(); // Refresh data
  };

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
            <span className="material-symbols-outlined">dashboard</span>
            <span>Command Center</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined">inventory_2</span>
            <span>Inventory</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined">hub</span>
            <span>Live Traffic</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined">storefront</span>
            <span>Marketplace</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 mb-2 hover:bg-[#131315] font-medium hover:translate-x-1 transition-transform duration-200" href="#">
            <span className="material-symbols-outlined">psychology</span>
            <span>Neural Labs</span>
          </a>
        </div>
        <div className="mt-auto pt-8 border-t border-outline-variant/10 space-y-1">
          <button
            onClick={() => setShowAddProduct(true)}
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-xs uppercase tracking-widest mb-6 active:scale-95 transition-transform"
          >
            Deploy Asset
          </button>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-[#131315] font-medium text-sm" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-[#131315] font-medium text-sm" href="#">
            <span className="material-symbols-outlined">help_center</span>
            <span>Support</span>
          </a>
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="flex items-center gap-3 text-red-400/70 px-4 py-3 hover:bg-red-500/10 font-medium text-sm w-full rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
          {user && (
            <p className="text-[10px] text-slate-600 uppercase tracking-widest px-4 mt-2 truncate">{user.email}</p>
          )}
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen p-8 lg:p-12">
        <motion.div variants={container} initial="hidden" animate="show">
          <header className="mb-12">
            <motion.h1 variants={item} className="font-headline text-4xl font-black tracking-tighter text-on-surface mb-8">COMMAND_CENTER.SYS</motion.h1>

            {error && (
              <motion.div variants={item} className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs uppercase tracking-widest font-bold">
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Sales — LIVE DATA */}
              <motion.div variants={item} className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/20 flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:border-outline-variant/40 transition-all duration-300 shadow-oled-primary">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Total Revenue</span>
                  <span className="material-symbols-outlined text-primary/50">payments</span>
                </div>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="w-24 h-8 bg-surface-container-high animate-pulse rounded"></div>
                  ) : (
                    <span className="font-headline text-3xl font-bold text-on-surface">
                      ${totalRevenue >= 1000 ? `${(totalRevenue / 1000).toFixed(1)}K` : totalRevenue.toFixed(2)}
                    </span>
                  )}
                  <span className="text-primary text-xs font-bold">{orders.length} orders</span>
                </div>
              </motion.div>
              {/* Active Products — LIVE DATA */}
              <motion.div variants={item} className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/20 flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:border-outline-variant/40 transition-all duration-300 shadow-oled-secondary">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-secondary tracking-widest uppercase">Active Products</span>
                  <span className="material-symbols-outlined text-secondary/50">inventory_2</span>
                </div>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="w-16 h-8 bg-surface-container-high animate-pulse rounded"></div>
                  ) : (
                    <span className="font-headline text-3xl font-bold text-on-surface">{totalProducts}</span>
                  )}
                  <span className="text-secondary text-xs font-bold">In Catalog</span>
                </div>
              </motion.div>
              {/* Low Stock Alerts — LIVE DATA */}
              <motion.div variants={item} className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/20 flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:border-outline-variant/40 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Stock Alerts</span>
                  <span className="material-symbols-outlined text-on-surface-variant/50">warning</span>
                </div>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="w-12 h-8 bg-surface-container-high animate-pulse rounded"></div>
                  ) : (
                    <span className={`font-headline text-3xl font-bold ${lowStockProducts.length > 0 ? 'text-red-400' : 'text-on-surface'}`}>
                      {lowStockProducts.length}
                    </span>
                  )}
                  <span className="text-on-surface-variant text-xs font-medium">
                    {lowStockProducts.length > 0 ? 'Need Attention' : 'All Healthy'}
                  </span>
                </div>
              </motion.div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6">
            {/* Product Inventory — LIVE DATA */}
            <motion.div variants={item} className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/20 relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Product Inventory</h3>
                  <p className="text-sm text-on-surface-variant">Real-time asset grid</p>
                </div>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="px-4 py-2 bg-primary/10 rounded-full text-xs font-bold text-primary border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  ADD PRODUCT
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-16 bg-surface-container-high animate-pulse rounded-xl"></div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <span className="material-symbols-outlined text-4xl text-outline/30 mb-4 block">inventory_2</span>
                  <p className="text-outline text-sm uppercase tracking-widest">No products deployed yet</p>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="mt-4 px-6 py-3 bg-primary text-on-primary rounded-full text-xs font-bold uppercase tracking-widest"
                  >
                    Deploy First Asset
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      href={`/product/${product._id}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/5 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 group block"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface border border-outline-variant/20 overflow-hidden flex-shrink-0">
                          {product.images?.[0] ? (
                            <img className="w-full h-full object-cover opacity-80" alt={product.name} src={product.images[0]} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-outline/30 text-sm">image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors uppercase tracking-wide">{product.name}</div>
                          <div className="text-[10px] text-on-surface-variant font-mono uppercase">{product.category || 'Uncategorized'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-sm font-mono font-bold text-on-surface">${product.price.toFixed(2)}</div>
                          <div className="text-[10px] text-on-surface-variant">PRICE</div>
                        </div>
                        <div className="text-right min-w-[60px]">
                          <div className={`text-sm font-mono font-bold ${product.stock < 10 ? 'text-red-400' : product.stock < 30 ? 'text-yellow-400' : 'text-primary'}`}>
                            {product.stock}
                          </div>
                          <div className="text-[10px] text-on-surface-variant">STOCK</div>
                        </div>
                        <span className="material-symbols-outlined text-outline/30 group-hover:text-primary transition-colors text-sm">chevron_right</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Critical Inventory Alerts — LIVE DATA */}
            <motion.div variants={item} className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/20 border-l-4 border-l-tertiary">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary">warning</span>
                <h3 className="font-headline text-xl font-bold text-on-surface">Critical Inventory</h3>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="h-20 bg-surface-container-high animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : lowStockProducts.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-primary text-3xl mb-2 block">check_circle</span>
                  <p className="text-sm text-on-surface-variant uppercase tracking-widest">All stock levels healthy</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.map(product => (
                    <Link key={product._id} href={`/product/${product._id}`} className="block p-4 bg-surface-container-high rounded-lg border border-tertiary/20 hover:border-tertiary transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02]">
                      <div className="flex justify-between items-center mb-2 gap-2">
                        <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors uppercase">{product.name}</span>
                        <span className="text-xs font-bold text-tertiary whitespace-nowrap">
                          {product.stock === 0 ? 'OUT OF STOCK' : 'LOW STOCK'}
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${product.stock === 0 ? 'bg-red-500 w-[2%]' : 'bg-tertiary'}`} style={{ width: `${Math.max(2, (product.stock / 50) * 100)}%` }}></div>
                      </div>
                      <p className="text-[10px] text-on-surface-variant mt-2">{product.stock} units remaining</p>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Recent Orders — LIVE DATA */}
            <motion.div variants={item} className="col-span-12 bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/20 mt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-tight">Recent Transactions</h3>
                  <p className="text-sm text-on-surface-variant">Orders containing your products</p>
                </div>
                <div className="flex items-center gap-4 bg-surface-container-highest px-4 py-2 rounded-full text-xs font-bold">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  {orders.length} TOTAL
                </div>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-14 bg-surface-container-high animate-pulse rounded-xl"></div>
                  ))}
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-3xl text-outline/30 mb-2 block">receipt_long</span>
                  <p className="text-on-surface-variant text-sm uppercase tracking-widest">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-high/30 border border-outline-variant/5 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-[10px] font-mono text-primary border border-outline-variant/10">
                          #{order.id.toString().padStart(4, '0')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-on-surface tracking-wide">User {order.userId.slice(0, 8)}...</div>
                          <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-sm font-mono font-bold text-on-surface">${order.totalAmount.toFixed(2)}</div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                          order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          order.status === 'shipped' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          'bg-primary/10 text-primary border-primary/20'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

      {/* Product Form Modal */}
      <ProductFormModal
        open={showAddProduct}
        onClose={handleProductAdded}
      />
    </div>
  );
}
