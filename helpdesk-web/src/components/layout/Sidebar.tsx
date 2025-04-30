'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebarStore';
import { useAuthStore } from '@/store/authStore';
import theme from '@/theme';
import {
  HomeIcon,
  TicketIcon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserGroupIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import {
  EscalationIcon,
  VerificationIcon,
  RolesIcon,
  HelpTopicsIcon,
  CannedResponsesIcon
} from '@/components/icons';

// Helper function to combine class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Navigation item type
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

// Define navigation items with icons
const navigationItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Tickets', href: '/tickets', icon: TicketIcon },
  { name: 'Escalations', href: '/escalations', icon: EscalationIcon },
  { name: 'Verifications', href: '/verifications', icon: VerificationIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, adminOnly: true },
];

// Define settings sub-navigation items
const settingsSubNav: NavItem[] = [
  { name: 'Users', href: '/settings/users', icon: UserGroupIcon, adminOnly: true },
  { name: 'Roles', href: '/settings/roles', icon: RolesIcon, adminOnly: true },
  { name: 'Help Topics', href: '/settings/help-topics', icon: HelpTopicsIcon, adminOnly: true },
  { name: 'Canned Responses', href: '/settings/canned-responses', icon: CannedResponsesIcon, adminOnly: true },
  { name: 'Escalation Rules', href: '/settings/escalation', icon: EscalationIcon, adminOnly: true },
];

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebarStore();
  const { user } = useAuthStore();
  const pathname = usePathname();
  const isAdmin = user?.role === 'admin';

  // Check if current path is in settings
  const isInSettings = pathname?.startsWith('/settings');

  return (
    <div
      className={classNames(
        "text-white transition-all duration-300 ease-in-out h-screen fixed left-0 top-0 z-[1000]",
        isExpanded ? "w-64" : "w-16"
      )}
      style={{
        backgroundColor: theme.colors.brand.sidebar,
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        zIndex: 1000,
        position: 'fixed',
        overflow: 'visible',
        height: '100vh',
        display: 'block',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      {/* Sidebar header with logo and toggle button */}
      <div className="flex items-center justify-between h-16 px-2 border-b border-gray-600">
        {isExpanded ? (
          <Link href="/" className="text-xl font-bold text-white truncate flex items-center">
            <img src="/assets/logo.svg" alt="OneApp" className="w-8 h-8 mr-2" />
            <span className="text-[#df0817] bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-pulse-slow">one</span><span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">app</span>
          </Link>
        ) : (
          <Link href="/" className="mx-auto">
            <img src="/assets/logo.svg" alt="OneApp" className="w-10 h-10" />
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={classNames(
            "p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105",
            isExpanded
              ? "ml-2"
              : `absolute -right-6 top-8 shadow-lg border border-gray-500 rounded-full w-10 h-10 flex items-center justify-center z-[1001]`
          )}
          style={{
            backgroundColor: isExpanded ? 'transparent' : theme.colors.brand.sidebar,
            zIndex: 1001,
            boxShadow: isExpanded ? 'none' : '0 2px 8px rgba(0,0,0,0.25)'
          }}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          ) : (
            <ChevronDoubleRightIcon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Main navigation */}
      <nav className="mt-5 px-2 space-y-1">
        {navigationItems
          .filter(item => !item.adminOnly || isAdmin)
          .map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? `bg-opacity-20 bg-[${theme.colors.brand.accent}] text-white`
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center py-2 text-sm font-medium rounded-md transition-all duration-200',
                  isExpanded ? 'px-2 justify-start' : 'px-0 justify-center'
                )}
                title={!isExpanded ? item.name : undefined}
              >
                <item.icon
                  className={classNames(
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                    'flex-shrink-0 h-6 w-6',
                    isExpanded ? 'mr-3' : 'mx-auto'
                  )}
                  aria-hidden="true"
                />
                {isExpanded && <span className="truncate animate-fadeIn">{item.name}</span>}
              </Link>
            );
          })}
      </nav>

      {/* Settings sub-navigation (only show if in settings section) */}
      {isAdmin && isInSettings && isExpanded && (
        <div className="mt-8 px-2">
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Settings
          </h3>
          <div className="mt-1 space-y-1">
            {settingsSubNav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? `bg-[${theme.colors.brand.accent}] bg-opacity-20 text-white`
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md ml-2'
                  )}
                >
                  <item.icon
                    className={classNames(
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                      'mr-3 flex-shrink-0 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapsed settings sub-navigation icons only */}
      {isAdmin && isInSettings && !isExpanded && (
        <div className="mt-4 px-0 space-y-1">
          <div className="border-t border-gray-700 pt-2 pb-1">
            <p className="text-xs text-gray-500 text-center mb-1">Settings</p>
          </div>
          {settingsSubNav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? `bg-[${theme.colors.brand.accent}] bg-opacity-20 text-white`
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center justify-center py-2 rounded-md'
                )}
                title={item.name}
              >
                <item.icon
                  className={classNames(
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                    'flex-shrink-0 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
