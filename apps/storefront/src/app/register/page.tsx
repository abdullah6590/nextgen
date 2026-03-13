'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', { email, password, role: 'customer' });
      // Redirect to login after successful registration
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Neural link aborted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-blue/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-purple/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white uppercase mb-2">
              Create Account
            </h1>
            <p className="text-text-sub text-sm font-mono opacity-60">Establish connection to mainframe</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded text-center">
                {error}
              </div>
            )}
            
            <Input
              label="Node Identity (Email)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="new_user@nextgen.com"
              required
            />
            
            <Input
              label="Auth Sequence (Password)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create strong sequence"
              required
              minLength={6}
            />

            <Button type="submit" variant="secondary" className="w-full py-4 text-white" disabled={loading}>
              {loading ? 'Syncing...' : 'Establish Uplink'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-text-sub">
            Already registered? <a href="/login" className="text-neon-blue hover:text-white transition-colors uppercase tracking-widest font-bold ml-2">Login</a>
          </div>
        </div>
      </Card>
    </div>
  );
}
