import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHomeIcon?: boolean;
}

export default function Breadcrumb({ items = [], showHomeIcon = true }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Generate breadcrumb items based on the current path if not provided
  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbItems(pathname || '');

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {showHomeIcon && (
          <li>
            <div>
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
        )}
        
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 || showHomeIcon ? (
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            ) : null}
            <div className={index > 0 || showHomeIcon ? 'ml-2' : ''}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumb items based on the current path
function generateBreadcrumbItems(path: string): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];
  
  if (segments.length === 0) {
    return [{ label: 'Home' }];
  }
  
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Format the label (capitalize and replace hyphens with spaces)
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    // Special cases
    if (segment === 'dashboard') label = 'Dashboard';
    if (segment === 'tickets') label = 'Tickets';
    if (segment === 'escalations') label = 'Escalations';
    if (segment === 'verifications') label = 'Verifications';
    if (segment === 'settings') label = 'Settings';
    if (segment === 'users') label = 'User Management';
    if (segment === 'roles') label = 'Role Management';
    if (segment === 'help-topics') label = 'Help Topics';
    if (segment === 'canned-responses') label = 'Canned Responses';
    if (segment === 'escalation') label = 'Escalation Rules';
    
    // If it's the last segment, don't add a link
    if (index === segments.length - 1) {
      items.push({ label });
    } else {
      items.push({ label, href: currentPath });
    }
  });
  
  return items;
}
