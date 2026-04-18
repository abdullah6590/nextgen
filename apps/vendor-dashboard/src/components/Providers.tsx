'use client';

import { ReactNode } from 'react';
import { VendorAuthProvider } from '../lib/VendorAuthContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <VendorAuthProvider>
      {children}
    </VendorAuthProvider>
  );
}
