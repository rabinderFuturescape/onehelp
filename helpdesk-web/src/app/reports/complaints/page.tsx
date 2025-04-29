'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { ReportSummary } from '@/components/reports/ReportSummary';
import { ComplaintTable } from '@/components/complaints/ComplaintTable';
import { ReportFilters as FiltersType } from '@/types/reports';
import { useComplaintsReport } from '@/hooks/useReports';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ComplaintsReportPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router, user]);

  // State for filters
  const [filters, setFilters] = useState<FiltersType>({});

  // Queries
  const { data: report, isLoading, error } = useComplaintsReport(filters);

  // Handlers
  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleViewComplaint = (complaint: any) => {
    router.push(`/helpdesk/complaints/${complaint.id}`);
  };

  const handleEditComplaint = (complaint: any) => {
    router.push(`/helpdesk/complaints/${complaint.id}`);
  };

  const handleDeleteComplaint = (complaint: any) => {
    // Not implemented for reports page
  };

  if (!isAuthenticated || (user?.role !== 'admin')) {
    return null;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Reports', href: '/reports' },
            { label: 'Complaints' },
          ]}
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">Complaints Report</h1>
        </div>
      </div>

      <ReportFilters filters={filters} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading report...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading report: {error.message}
        </div>
      ) : report ? (
        <div className="space-y-6">
          <ReportSummary report={report} />

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Complaints</h3>
              {report.complaints.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500">No complaints found matching your filters.</p>
                  <p className="text-gray-500 mt-1">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              ) : (
                <ComplaintTable
                  complaints={report.complaints}
                  onView={handleViewComplaint}
                  onEdit={handleEditComplaint}
                  onDelete={handleDeleteComplaint}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No report data available.</p>
          <p className="text-gray-500 mt-1">
            Apply filters to generate a report.
          </p>
        </div>
      )}
    </div>
  );
}
