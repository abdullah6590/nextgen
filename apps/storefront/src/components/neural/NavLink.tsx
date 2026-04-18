'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  activeClassName?: string;
  className?: string;
  exact?: boolean;
}

export function NavLink({ 
  href, 
  children, 
  activeClassName = "text-cyan-400 border-b-2 border-cyan-400 pb-1", 
  className = "text-slate-400 hover:text-cyan-200 transition-colors", 
  exact = false 
}: NavLinkProps) {
  const pathname = usePathname() || '';
  
  // Custom logic to handle dynamic route sub-paths correctly
  let isActive = false;
  if (exact) {
    isActive = pathname === href;
  } else if (href === '/') {
    isActive = pathname === '/';
  } else {
    isActive = pathname.startsWith(href);
  }

  return (
    <Link href={href} className={isActive ? activeClassName : className}>
      {children}
    </Link>
  );
}
