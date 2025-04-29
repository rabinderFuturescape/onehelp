'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';

const navigation = [
  { name: 'General', href: '/settings' },
  { name: 'Escalation Matrix', href: '/settings/escalation' },
  { name: 'User Management', href: '/settings/users' },
  { name: 'Roles & Permissions', href: '/settings/roles' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router, user]);

  if (!isAuthenticated || (user?.role !== 'admin')) {
    return null;
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="py-6">{children}</main>
      </div>
    </MainLayout>
  );
}
