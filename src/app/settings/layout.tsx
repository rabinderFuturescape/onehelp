'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 flex-shrink-0">
          <nav className="py-4 md:py-0 md:pr-8">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? 'bg-gray-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  );
}
