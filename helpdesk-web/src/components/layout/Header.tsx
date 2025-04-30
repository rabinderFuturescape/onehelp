'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import theme from '@/theme';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isExpanded } = useSidebarStore();
  const pathname = usePathname();
  const router = useRouter();

  // Function to handle back navigation
  const handleGoBack = () => {
    if (pathname?.startsWith('/settings/')) {
      router.push('/settings');
    } else if (pathname?.startsWith('/tickets/')) {
      router.push('/tickets');
    } else {
      router.push('/dashboard');
    }
  };

  // Determine if we should show the back button
  const showBackButton = pathname && (
    pathname.startsWith('/settings/') ||
    (pathname.startsWith('/tickets/') && pathname !== '/tickets') ||
    pathname.startsWith('/escalations/') ||
    pathname.startsWith('/verifications/')
  );

  // Get current page title
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/tickets') return 'Tickets';
    if (pathname === '/escalations') return 'Escalations';
    if (pathname === '/verifications') return 'Verifications';
    if (pathname === '/settings') return 'Settings';

    if (pathname?.startsWith('/settings/users')) return 'User Management';
    if (pathname?.startsWith('/settings/roles')) return 'Role Management';
    if (pathname?.startsWith('/settings/help-topics')) return 'Help Topics';
    if (pathname?.startsWith('/settings/canned-responses')) return 'Canned Responses';
    if (pathname?.startsWith('/settings/escalation')) return 'Escalation Rules';

    if (pathname?.startsWith('/tickets/')) return 'Ticket Details';

    return 'Helpdesk';
  };

  return (
    <Disclosure as="nav" className="bg-white shadow fixed top-0 right-0" style={{
      zIndex: 900,
      width: `calc(100% - ${isExpanded ? theme.sidebar.expandedWidth : theme.sidebar.collapsedWidth})`,
      marginLeft: isExpanded ? theme.sidebar.expandedWidth : theme.sidebar.collapsedWidth,
    }}>
      {({ open }) => (
        <>
          <div
            className="px-4 mx-auto sm:px-6 lg:px-8 transition-all duration-300 ease-in-out"
            style={{
              width: '100%',
              position: 'relative'
            }}
          >
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Back button */}
                {showBackButton && (
                  <button
                    onClick={handleGoBack}
                    className="inline-flex items-center mr-4 text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeftIcon className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                )}

                {/* Page title */}
                <h1 className="text-lg font-semibold text-gray-900">
                  {getPageTitle()}
                </h1>
              </div>

              <div className="flex items-center">
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <div className="px-4 py-2 text-sm text-gray-700">
                              <div className="font-medium">{user?.fullName}</div>
                              <div className="text-gray-500">{user?.email}</div>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => logout()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="space-x-4">
                    <Link
                      href="/login"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
