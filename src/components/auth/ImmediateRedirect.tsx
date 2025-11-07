'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ImmediateRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      console.log('🔄 ImmediateRedirect - Usuario:', user.role);
      if (user.role === 'admin') {
        router.replace('/dashboard');
      } else {
        router.replace('/student/dashboard');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p>Redirigiendo a tu dashboard...</p>
        <p className="text-sm text-gray-600 mt-2">Usuario: {user?.role}</p>
      </div>
    </div>
  );
}