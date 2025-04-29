import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, Input, Select } from '@/components/ui/Form';
import { ReportFilters as FiltersType, EXPORT_FORMAT_OPTIONS } from '@/types/reports';
import { FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { exportComplaintsReport } from '@/hooks/useReports';

interface ReportFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [localFilters, setLocalFilters] = useState<FiltersType>(filters);
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

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
    const resetFilters = {};
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob = await exportComplaintsReport(filters, exportFormat);
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `complaints-report.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting report:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Report Filters</h3>
          <div className="flex space-x-2">
            <Select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="text-sm"
            >
              {EXPORT_FORMAT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex items-center"
              isLoading={isExporting}
            >
              {!isExporting && <ArrowDownTrayIcon className="h-5 w-5 mr-1" />}
              Export Report
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FormField>
            <FormLabel htmlFor="from">From Date</FormLabel>
            <Input
              id="from"
              name="from"
              type="date"
              value={localFilters.from || ''}
              onChange={handleInputChange}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="to">To Date</FormLabel>
            <Input
              id="to"
              name="to"
              type="date"
              value={localFilters.to || ''}
              onChange={handleInputChange}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="ticketNumber">Ticket Number</FormLabel>
            <Input
              id="ticketNumber"
              name="ticketNumber"
              value={localFilters.ticketNumber || ''}
              onChange={handleInputChange}
              placeholder="Enter ticket number"
            />
          </FormField>

          <div className="flex items-center space-x-4 pt-8">
            <div className="flex items-center">
              <input
                id="isOverdue"
                name="isOverdue"
                type="checkbox"
                checked={!!localFilters.isOverdue}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isOverdue"
                className="ml-2 block text-sm text-gray-900"
              >
                Overdue
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="isEscalated"
                name="isEscalated"
                type="checkbox"
                checked={!!localFilters.isEscalated}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isEscalated"
                className="ml-2 block text-sm text-gray-900"
              >
                Escalated
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset
          </Button>
          <Button onClick={handleApplyFilters}>
            <FunnelIcon className="h-5 w-5 mr-1" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
