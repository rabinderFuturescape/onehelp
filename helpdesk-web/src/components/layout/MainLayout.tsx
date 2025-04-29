import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';
import theme from '@/theme';
import { ResponsiveContainer } from '@/components/shared';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isExpanded } = useSidebarStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow" style={{ paddingTop: theme.header.height }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main
          className="flex-grow transition-all duration-300 ease-in-out bg-white"
          style={{
            marginLeft: isExpanded ? theme.sidebar.expandedWidth : theme.sidebar.collapsedWidth,
            minHeight: `calc(100vh - ${theme.header.height})`,
            position: 'relative',
            zIndex: 10,
            width: `calc(100% - ${isExpanded ? theme.sidebar.expandedWidth : theme.sidebar.collapsedWidth})`,
            overflow: 'auto'
          }}
        >
          <div className="py-6">
            <ResponsiveContainer maxWidth="full">
              {children}
            </ResponsiveContainer>
          </div>
        </main>
      </div>

      <footer
        className="py-4 bg-gray-100 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isExpanded ? theme.sidebar.expandedWidth : theme.sidebar.collapsedWidth,
          position: 'relative',
          zIndex: 10,
          width: `calc(100% - ${isExpanded ? theme.sidebar.expandedWidth : theme.sidebar.collapsedWidth})`
        }}
      >
        <ResponsiveContainer>
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} Helpdesk App. All rights reserved.
          </p>
        </ResponsiveContainer>
      </footer>
    </div>
  );
}
