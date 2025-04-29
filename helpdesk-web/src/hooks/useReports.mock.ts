import { useQuery } from '@tanstack/react-query';
import mockApi from '@/lib/mockApi';
import { ReportFilters, ReportResponse } from '@/types/reports';

// Export complaints report
export const exportComplaintsReport = async (filters?: ReportFilters, format: string = 'csv'): Promise<Blob> => {
  return mockApi.exportComplaintsReport(filters, format);
};

// Hook for fetching complaints report
export const useComplaintsReport = (filters?: ReportFilters) => {
  return useQuery<ReportResponse, Error>({
    queryKey: ['reports', 'complaints', filters],
    queryFn: () => mockApi.getComplaintsReport(filters),
  });
};
