'use client';

import React, { useState, ReactNode } from 'react';
import { classNames } from '@/utils/classNames';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabPanelProps {
  tabs: Tab[];
  children: ReactNode[];
  defaultTabId?: string;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  contentClassName?: string;
  onTabChange?: (tabId: string) => void;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  tabs,
  children,
  defaultTabId,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  inactiveTabClassName = '',
  contentClassName = '',
  onTabChange,
}) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  // Ensure we have the right number of children
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length !== tabs.length) {
    console.warn(`TabPanel: Number of tabs (${tabs.length}) doesn't match number of children (${childrenArray.length})`);
  }

  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                if (onTabChange) onTabChange(tab.id);
              }}
              className={classNames(
                'py-3 px-4 text-sm font-medium border-b-2 focus:outline-none',
                activeTabId === tab.id
                  ? 'border-blue-600 text-blue-600 ' + activeTabClassName
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ' + inactiveTabClassName,
                tabClassName
              )}
              aria-current={activeTabId === tab.id ? 'page' : undefined}
            >
              <div className="flex items-center">
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </div>
      <div className={contentClassName}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={activeTabId === tab.id ? 'block' : 'hidden'}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
          >
            {childrenArray[index]}
          </div>
        ))}
      </div>
    </div>
  );
};
