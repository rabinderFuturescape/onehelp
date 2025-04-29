'use client';

import React, { useEffect } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MainLayout from '@/components/layout/MainLayout';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        <Breadcrumb items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings' }
        ]} />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/settings/users" className="bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Management
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Manage users, permissions, and access control.</p>
            </div>
          </div>
        </Link>

        <Link href="/settings/roles" className="bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Role Management
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Configure roles and permissions for users.</p>
            </div>
          </div>
        </Link>

        <Link href="/settings/help-topics" className="bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Help Topics
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Manage help topics and categories for tickets.</p>
            </div>
          </div>
        </Link>

        <Link href="/settings/canned-responses" className="bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Canned Responses
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Create and manage pre-defined responses for common issues.</p>
            </div>
          </div>
        </Link>

        <Link href="/settings/escalation" className="bg-white shadow rounded-lg hover:shadow-md transition-shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Escalation Rules
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Configure ticket escalation rules and SLAs.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
