'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { vendorApi } from '../../../lib/vendorApi';
import { useVendorAuth } from '../../../lib/VendorAuthContext';
import { ProductFormModal } from '../../../components/ProductFormModal';

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  tags?: string[];
  createdAt: string;
  vendorId: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { isAuthenticated, isLoading: authLoading } = useVendorAuth();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [resolvedId, setResolvedId] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    params.then(p => setResolvedId(p.id));
  }, [params]);

  const fetchProduct = async () => {
    if (!resolvedId) return;
    setLoading(true);
    try {
      const data = await vendorApi.getProduct(resolvedId);
      setProduct(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && resolvedId) {
      fetchProduct();
    }
  }, [isAuthenticated, resolvedId]);

  const handleDelete = async () => {
    if (!product) return;
    if (!confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) return;
    try {
      await vendorApi.deleteProduct(product._id);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete product');
    }
  };

  const handleEditClose = () => {
    setShowEdit(false);
    fetchProduct();
  };

  if (loading) {
    return (
      <div className="bg-[#131315] text-[#e5e1e4] font-body min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#4cd7f6]/30 border-t-[#4cd7f6] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[10px] text-[#4cd7f6] uppercase tracking-widest font-bold">Loading Neural Asset...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#131315] text-[#e5e1e4] font-body min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-red-400/50 mb-4 block">error</span>
          <p className="text-red-400 text-sm uppercase tracking-widest mb-4">{error || 'Product not found'}</p>
          <Link href="/" className="px-6 py-3 bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 rounded-full text-[#4cd7f6] text-xs font-bold uppercase tracking-widest hover:bg-[#4cd7f6]/20 transition-all">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const stockPercent = Math.min(product.stock, 100);
  const stockColor = product.stock < 10 ? 'text-red-400' : product.stock < 30 ? 'text-yellow-400' : 'text-[#4cd7f6]';
  const stockBarColor = product.stock < 10 ? 'from-red-500 to-red-400' : product.stock < 30 ? 'from-yellow-500 to-yellow-400' : 'from-[#4cd7f6] to-[#d0bcff]';

  return (
    <div className="bg-[#131315] text-[#e5e1e4] font-body selection:bg-[#d0bcff]/30 min-h-screen">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#131315]/80 backdrop-blur-xl border-b border-[#4cd7f6]/10">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
          <Link href="/" className="text-2xl font-black tracking-tighter text-[#4cd7f6] font-headline uppercase">NEURAL_VNDR</Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowEdit(true)}
              className="px-5 py-2.5 bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 rounded-full text-[#4cd7f6] text-xs font-bold uppercase tracking-widest hover:bg-[#4cd7f6]/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Delete
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-8 min-h-screen grid grid-cols-12 gap-8 max-w-[1920px] mx-auto relative">
        {/* Left: Product Image */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[700px] bg-[#0e0e10] rounded-[24px] overflow-hidden border border-[#3d494c]/10 group">
            {product.images?.[0] ? (
              <img
                alt={product.name}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]"
                src={product.images[0]}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-[#3d494c]">image</span>
              </div>
            )}
            <div className="absolute bottom-8 left-8 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#4cd7f6]">Live Product Data</span>
              </div>
              <h1 className="text-5xl font-black font-headline tracking-tighter text-white uppercase leading-none">{product.name}</h1>
              <p className="text-[#bcc9cd] font-medium tracking-wide">{product.category || 'Uncategorized'}</p>
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-[#4cd7f6]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-80 h-80 border border-[#d0bcff]/10 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
            </div>
          </div>
        </section>

        {/* Right: Product Details */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          {/* Price Card */}
          <div className="bg-[#1c1b1d] p-8 rounded-[24px] border border-[#3d494c]/20 shadow-[0_0_60px_-20px_rgba(76,215,246,0.1)]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-[#bcc9cd] uppercase tracking-widest mb-1">Pricing</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-headline font-black text-[#4cd7f6]">${product.price.toFixed(2)}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#4cd7f6]/50 text-3xl">payments</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-[#bcc9cd] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Created {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Stock Card */}
          <div className="bg-[#1c1b1d] p-8 rounded-[24px] border border-[#3d494c]/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-[#bcc9cd] uppercase tracking-widest mb-1">Inventory Status</p>
                <h3 className="text-xl font-headline font-bold text-white uppercase">Real-Time Sync</h3>
              </div>
              <span className="material-symbols-outlined text-[#d0bcff]">database</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-4xl font-headline font-bold ${stockColor}`}>{product.stock}</span>
              <span className="text-[#bcc9cd] text-sm pb-1">units available</span>
            </div>
            <div className="w-full h-2 bg-[#353437] rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${stockBarColor} rounded-full shadow-[0_0_10px_rgba(76,215,246,0.5)]`} style={{ width: `${stockPercent}%` }}></div>
            </div>
            {product.stock < 10 && (
              <p className="mt-3 text-xs text-red-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">warning</span>
                Low Stock Alert
              </p>
            )}
          </div>

          {/* Description Card */}
          <div className="bg-[#1c1b1d] p-8 rounded-[24px] border border-[#3d494c]/10 hover:border-[#4cd7f6]/40 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-md bg-[#4cd7f6]/10 text-[#4cd7f6]">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className="font-headline font-bold tracking-tight text-lg uppercase">Product Details</span>
            </div>
            <p className="text-sm text-[#bcc9cd] leading-relaxed">{product.description || 'No description available.'}</p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="bg-[#1c1b1d] p-8 rounded-[24px] border border-[#3d494c]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-md bg-[#d0bcff]/10 text-[#d0bcff]">
                  <span className="material-symbols-outlined">label</span>
                </div>
                <span className="font-headline font-bold tracking-tight text-lg uppercase">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <span key={i} className="bg-[#353437] text-[#bcc9cd] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-[#3d494c]/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mt-auto">
            <button
              onClick={() => setShowEdit(true)}
              className="w-full py-5 rounded-full bg-[#4cd7f6] text-[#003640] font-headline font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(76,215,246,0.4)] flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">edit</span> EDIT PRODUCT
            </button>
            <Link
              href="/"
              className="w-full py-4 rounded-full bg-[#1c1b1d] border border-[#4cd7f6]/20 text-[#4cd7f6]/60 font-headline font-bold uppercase tracking-[0.1em] hover:text-[#4cd7f6] hover:border-[#4cd7f6]/50 transition-all flex items-center justify-center gap-2 text-xs"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 mt-auto bg-[#0e0e10] border-t border-[#4cd7f6]/10 flex flex-col items-center gap-6">
        <p className="text-slate-600 font-body text-[10px] tracking-widest uppercase">© 2025 NEURAL ARCHITECT. ALL ASSETS RENDERED IN 8K.</p>
      </footer>

      {/* Edit Modal */}
      <ProductFormModal
        open={showEdit}
        onClose={handleEditClose}
        editProduct={product}
      />
    </div>
  );
}
