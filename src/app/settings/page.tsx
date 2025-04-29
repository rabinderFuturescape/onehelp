'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
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
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Settings' }]} />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Helpdesk Configuration
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Configure your helpdesk settings, including escalation rules, user management,
              and permissions.
            </p>
          </div>
          <div className="mt-5">
            <p className="text-sm text-gray-500">
              Select a category from the sidebar to manage specific settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
