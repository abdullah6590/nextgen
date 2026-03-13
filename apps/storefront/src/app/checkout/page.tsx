'use client';

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import api from '../../lib/api';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If cart is empty and not success state, don't show checkout
  if (items.length === 0 && !success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6">
        <h1 className="text-3xl font-bold font-mono text-text-sub tracking-widest uppercase mb-6">Checkout Sequence Aborted</h1>
        <p className="text-neon-blue opacity-50 mb-8">Cart is empty.</p>
        <Button onClick={() => router.push('/products')}>Return to Catalog</Button>
      </div>
    );
  }

  // Must be logged in to checkout
  if (!isAuthenticated && !success) {
     return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6">
          <h1 className="text-3xl font-bold font-mono text-neon-pink tracking-widest uppercase mb-6">Unauthorized Access</h1>
          <p className="text-text-sub opacity-80 mb-8">You must be authenticated to execute a transaction.</p>
          <div className="flex gap-4">
             <Button onClick={() => router.push('/login')}>Login</Button>
             <Button variant="secondary" onClick={() => router.push('/register')}>Register</Button>
          </div>
        </div>
     );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Structure the data as expected by the order-service
      // userId is now extracted from JWT token on the backend
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await api.post('/orders', orderData);
      
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Transaction failed due to network anomaly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 relative overflow-hidden">
        {/* Success Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-96 h-96 bg-neon-blue/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow"></div>
        </div>

        <Card className="text-center p-12 max-w-lg relative z-10 border-neon-blue/50 bg-surface/80 backdrop-blur-xl">
          <div className="w-20 h-20 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-blue shadow-[0_0_30px_rgba(0,240,255,0.4)]">
             <svg className="w-10 h-10 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-blue uppercase mb-4">
            Transaction Verified
          </h1>
          <p className="text-text-sub font-mono mb-8 opacity-80 leading-relaxed">Your hardware requisition has been successfully logged in the mainframe. Dispatch protocols initiated.</p>
          
          <div className="flex flex-col gap-4">
            <Button onClick={() => router.push('/orders')} variant="primary" className="w-full">
               View Log // Orders
            </Button>
            <Button onClick={() => router.push('/products')} variant="glass" className="w-full">
               Continue Browsing
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
      <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-text-sub uppercase mb-12">
        Finalize Acquisition
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold tracking-widest uppercase text-neon-blue mb-4 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-neon-blue"></span>
             Requisition Details
          </h2>
          
          <div className="space-y-4">
            {items.map(item => (
              <Card key={item.productId} className="flex gap-4 p-4 items-center bg-surface-hover/30 border-[rgba(255,255,255,0.05)]">
                <div className="w-16 h-16 bg-background rounded border border-[rgba(255,255,255,0.05)] overflow-hidden">
                   {item.image ? (
                     <img src={item.image} className="w-full h-full object-cover" alt="" />
                   ) : (
                     <div className="w-full h-full flex justify-center items-center text-neon-blue opacity-20"><span className="text-[8px] font-mono">IMG_NA</span></div>
                   )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm tracking-wide">{item.name}</h3>
                  <div className="text-xs text-text-sub font-mono mt-1 uppercase">ID: {item.productId.slice(0, 8)}...</div>
                </div>
                <div className="text-right">
                  <div className="text-neon-blue font-mono">${item.price.toFixed(2)}</div>
                  <div className="text-xs text-text-sub mt-1">QTY: {item.quantity}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28 bg-surface/80 border-t-2 border-t-neon-purple">
            <h2 className="text-xl font-bold tracking-widest uppercase text-white mb-6">
               Terminal Readout
            </h2>

            <div className="space-y-4 font-mono text-sm border-b border-[rgba(255,255,255,0.05)] pb-6 mb-6">
               <div className="flex justify-between text-text-sub">
                 <span>Subtotal ({totalItems} items)</span>
                 <span>${totalPrice.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-text-sub">
                 <span>Network Transfer Fee</span>
                 <span>$0.00</span>
               </div>
               <div className="flex justify-between text-text-sub">
                 <span>Cyber Tax</span>
                 <span>${(totalPrice * 0.08).toFixed(2)}</span>
               </div>
            </div>

            <div className="flex justify-between items-center mb-8">
               <span className="uppercase tracking-widest font-bold text-white">Total Exchange</span>
               <span className="text-2xl font-mono text-neon-blue font-bold">${(totalPrice * 1.08).toFixed(2)}</span>
            </div>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 text-xs px-4 py-3 rounded font-mono uppercase tracking-widest text-center">
                ERR: {error}
              </div>
            )}

            <Button 
               className="w-full py-4" 
               onClick={handlePlaceOrder}
               disabled={loading}
            >
               {loading ? 'Transmitting Data...' : 'Execute Transaction'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
