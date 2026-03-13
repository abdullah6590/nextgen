'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface OrderItem {
  id: number;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth state is verified and user is missing, redirect immediately
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (user === null && !token) {
       router.push('/login');
       return;
    }

    const fetchOrders = async () => {
      try {
        if (user) {
          const { data } = await api.get(`/orders/my-orders`);
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to parse order log');
      } finally {
         setLoading(false);
      }
    };

    if (user) {
       fetchOrders();
    }
  }, [user, router]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!isAuthenticated && !token) return null; // let useEffect redirect

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
         <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white uppercase mb-2">
          Transaction Logs
        </h1>
        <p className="text-text-sub font-mono text-sm opacity-60">Historical requisition data for entity #{user?.userId}</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-xl border border-[rgba(255,255,255,0.05)] shadow-lg">
            <svg className="w-16 h-16 mx-auto mb-4 text-text-sub opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
           <span className="text-text-sub uppercase tracking-widest font-mono text-sm">No recorded transactions found.</span>
           <div className="mt-8">
              <Button variant="secondary" onClick={() => router.push('/products')}>Browse Database</Button>
           </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="border border-[rgba(255,255,255,0.05)] hover:border-neon-blue/30 transition-colors p-6">
               <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                 <div className="mb-4 md:mb-0">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-text-sub mb-1">Transaction ID</div>
                    <div className="font-mono text-white text-lg tracking-wider">#{order.id.toString().padStart(6, '0')}</div>
                 </div>
                 
                 <div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-text-sub mb-1">Timestamp</div>
                    <div className="font-mono text-white">{new Date(order.createdAt).toLocaleString()}</div>
                 </div>
                 
                 <div className="text-right mt-4 md:mt-0">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-text-sub mb-1">Status</div>
                    <div className={`font-mono font-bold tracking-widest uppercase ${order.status === 'pending' ? 'text-neon-pink animate-pulse' : 'text-neon-blue'}`}>
                       [{order.status}]
                    </div>
                 </div>
               </div>

               <div className="space-y-3 mb-6">
                 <div className="text-[10px] font-mono tracking-widest uppercase text-text-sub">Acquired Assets</div>
                 {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm font-mono bg-surface-hover/50 py-2 px-3 rounded border border-[rgba(255,255,255,0.05)]">
                       <span className="text-white opacity-90"><span className="text-neon-blue opacity-50 mr-2">{item.quantity}x</span> ID-{item.productId.slice(0, 8)}</span>
                       <span className="text-neon-purple">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                 ))}
               </div>

               <div className="flex justify-between items-center pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <span className="text-sm font-bold tracking-widest text-text-sub uppercase">Total Expenditure</span>
                  <span className="text-xl font-mono text-neon-blue font-bold">${order.totalAmount.toFixed(2)}</span>
               </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
