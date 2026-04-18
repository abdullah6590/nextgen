'use client';

import { useEffect, useState } from 'react';
import { vendorApi } from '../lib/vendorApi';

interface Order {
  id: number;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: { productId: string; quantity: number; price: number }[];
}

export function RecentOrdersTile() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorApi.getVendorOrders()
      .then(data => setOrders(data.slice(0, 4)))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold tracking-tight">Recent Transactions</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-white/5 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold tracking-tight">Recent Transactions</h3>
        <button className="text-xs text-neonCyan hover:underline font-mono uppercase tracking-widest">Full Log →</button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8 text-textSub text-xs uppercase tracking-widest">
          No orders yet
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-[10px] font-mono text-neonCyan border border-white/5">
                  {order.id.toString().padStart(4, '0')}
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-wide">User {order.userId.slice(0, 8)}</div>
                  <div className="text-[10px] font-mono text-textSub uppercase tracking-widest">ORD-{order.id}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-sm font-mono font-bold text-white">${order.totalAmount.toFixed(2)}</div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                  order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                  order.status === 'shipped' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  'bg-neonBlue/10 text-neonBlue border-neonBlue/20'
                }`}>
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
