'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to authenticate. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neonPink/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neonBlue/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-textSub uppercase mb-2">
              System Access
            </h1>
            <p className="text-textSub text-sm font-mono opacity-60">Initialize authentication protocol</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded text-center">
                {error}
              </div>
            )}
            
            <Input
              label="Secure Identifier (Email)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@nextgen.com"
              required
            />
            
            <Input
              label="Encryption Key (Password)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" variant="primary" className="w-full py-4" disabled={loading}>
              {loading ? 'Authenticating...' : 'Override Access'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-textSub">
            Unregistered entity? <a href="/register" className="text-neonPink hover:text-white transition-colors uppercase tracking-widest font-bold ml-2">Request Access</a>
          </div>
        </div>
      </Card>
    </div>
  );
}
