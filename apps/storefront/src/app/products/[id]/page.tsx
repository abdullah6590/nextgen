'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// This route redirects to the canonical product detail page at /product/[id]
export default function ProductRedirect() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      router.replace(`/product/${id}`);
    }
  }, [id, router]);

  return (
    <div className="bg-[#131315] text-[#e5e1e4] font-body min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#4cd7f6]/30 border-t-[#4cd7f6] rounded-full animate-spin"></div>
        <p className="text-[10px] text-[#bcc9cd] uppercase tracking-widest font-bold">Redirecting...</p>
      </div>
    </div>
  );
}
