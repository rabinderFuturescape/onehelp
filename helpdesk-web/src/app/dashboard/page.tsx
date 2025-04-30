'use client';

import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Dashboard' }]} showHomeIcon={false} />
          <div className="animate-fadeIn">
            <h1 className="mt-4 text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back, <span className="font-semibold text-blue-600">{user.firstName}</span>! Here's an overview of your helpdesk.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Open Tickets Widget */}
          <Link href="/tickets" className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center relative z-10">
              <div className="flex-shrink-0 p-3 text-white bg-gradient-to-br from-blue-500 to-blue-700 rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1 ml-5 w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Open Tickets</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">12</div>
                  </dd>
                </dl>
              </div>
            </div>
          </Link>

          {/* Escalations Due Widget */}
          <Link href="/escalations" className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center relative z-10">
              <div className="flex-shrink-0 p-3 text-white bg-gradient-to-br from-red-500 to-red-700 rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 ml-5 w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Escalations Due</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">3</div>
                  </dd>
                </dl>
              </div>
            </div>
          </Link>

          {/* Pending Verifications Widget */}
          <Link href="/verifications" className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center relative z-10">
              <div className="flex-shrink-0 p-3 text-white bg-gradient-to-br from-green-500 to-green-700 rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 ml-5 w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Verifications</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">5</div>
                  </dd>
                </dl>
              </div>
            </div>
          </Link>
        </div>

        {/* Enhanced UI Demo */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Try Our New Enhanced UI</h2>
            <Link
              href="/tickets/enhanced/1"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              View Demo
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Experience our new ticket detail interface with improved layout, tabbed actions, and job card management.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <Link href="/tickets" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View all tickets
            </Link>
          </div>
          <div className="mt-3 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <li key={item} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-colors duration-200 relative group">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/tickets/${1000 + item}`}
                        className="text-sm font-medium text-blue-600 truncate hover:text-blue-800 transition-colors duration-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        Ticket #{1000 + item}: Printer not working
                      </Link>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 group-hover:bg-green-200 transition-colors duration-200">
                          Open
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          John Doe
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <p>
                          Updated 2 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
