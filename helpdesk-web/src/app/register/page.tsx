'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import MainLayout from '@/components/layout/MainLayout';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <RegisterForm />
      </div>
    </MainLayout>
  );
}
