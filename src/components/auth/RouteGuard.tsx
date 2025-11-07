'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function RouteGuard({ 
  children, 
  requireAuth = true, 
  redirectTo
}: RouteGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push('/login');
      } else if (!requireAuth && user) {
        // ✅ SI NO PASARON redirectTo, DETERMINA SEGÚN EL ROL
        if (!redirectTo) {
          const destination = user.role === 'admin' 
            ? '/admin/dashboard' 
            : '/student/dashboard';
          router.push(destination);
        } else {
          router.push(redirectTo);
        }
      }
    }
  }, [user, isLoading, requireAuth, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
}