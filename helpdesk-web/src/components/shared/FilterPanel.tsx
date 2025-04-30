'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, Input, Select } from '@/components/ui/Form';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface FilterOption {
  id: string;
  name: string;
  type: 'text' | 'select' | 'date' | 'checkbox';
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  gridSpan?: 1 | 2 | 3 | 4;
}

export interface FilterPanelProps<T> {
  filters: T;
  onFilterChange: (filters: T) => void;
  filterOptions: FilterOption[];
  initialExpanded?: boolean;
  title?: string;
}

export function FilterPanel<T extends Record<string, any>>({
  filters,
  onFilterChange,
  filterOptions,
  initialExpanded = false,
  title = 'Filters',
}: FilterPanelProps<T>) {
  const [localFilters, setLocalFilters] = useState<T>({...filters});
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {} as T;
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Group checkbox filters separately
  const checkboxFilters = filterOptions.filter(option => option.type === 'checkbox');
  const otherFilters = filterOptions.filter(option => option.type !== 'checkbox');

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm"
          >
            {isExpanded ? (
              <>
                <XMarkIcon className="h-5 w-5 mr-1" />
                Hide Filters
              </>
            ) : (
              <>
                <FunnelIcon className="h-5 w-5 mr-1" />
                Show Filters
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherFilters.map((option) => {
                const colSpan = option.gridSpan || 1;
                const colSpanClass = colSpan > 1 ? `sm:col-span-${colSpan}` : '';

                if (option.type === 'text' || option.type === 'date') {
                  return (
                    <FormField key={option.id} className={colSpanClass}>
                      <FormLabel htmlFor={option.id}>{option.label}</FormLabel>
                      <Input
                        id={option.id}
                        name={option.id}
                        type={option.type === 'date' ? 'date' : 'text'}
                        value={localFilters[option.id] || ''}
                        onChange={handleInputChange}
                        placeholder={option.placeholder}
                      />
                    </FormField>
                  );
                } else if (option.type === 'select') {
                  return (
                    <FormField key={option.id} className={colSpanClass}>
                      <FormLabel htmlFor={option.id}>{option.label}</FormLabel>
                      <Select
                        id={option.id}
                        name={option.id}
                        value={localFilters[option.id] || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">All {option.label}s</option>
                        {option.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Select>
                    </FormField>
                  );
                }
                return null;
              })}

              {checkboxFilters.length > 0 && (
                <div className="flex items-center space-x-4 pt-8 lg:col-span-2">
                  {checkboxFilters.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={option.id}
                        name={option.id}
                        type="checkbox"
                        checked={!!localFilters[option.id]}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={option.id}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleResetFilters}>
                Reset
              </Button>
              <Button onClick={handleApplyFilters}>
                <FunnelIcon className="h-5 w-5 mr-1" />
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
