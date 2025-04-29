import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import mockApi from '@/lib/mockApi';
import { Complaint, ComplaintInput, Member } from '@/types/complaints';

// Types for filter parameters
export interface ComplaintFilters {
  status?: string;
  priority?: string;
  ticketNumber?: string;
  subject?: string;
  memberId?: string;
  unitNumber?: string;
  helpTopicId?: string;
  assignedToId?: string;
  from?: string;
  to?: string;
  isOverdue?: boolean;
  isEscalated?: boolean;
}

// Hook for fetching all complaints with optional filters
export const useComplaints = (filters?: ComplaintFilters) => {
  return useQuery<Complaint[], Error>({
    queryKey: ['complaints', filters],
    queryFn: () => mockApi.getComplaints(filters),
  });
};

// Hook for fetching a single complaint
export const useComplaint = (id: string) => {
  return useQuery<Complaint, Error>({
    queryKey: ['complaints', id],
    queryFn: () => mockApi.getComplaint(id),
    enabled: !!id,
  });
};

// Hook for creating a new complaint
export const useCreateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation<Complaint, Error, ComplaintInput>({
    mutationFn: mockApi.createComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
  });
};

// Hook for updating an existing complaint
export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Complaint,
    Error,
    { id: string; complaint: Partial<ComplaintInput> }
  >({
    mutationFn: ({ id, complaint }) => mockApi.updateComplaint(id, complaint),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
      queryClient.invalidateQueries({ queryKey: ['complaints', data.id] });
    },
  });
};

// Hook for deleting a complaint
export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: mockApi.deleteComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
  });
};

// Hook for searching members
export const useSearchMembers = (query: string) => {
  return useQuery<Member[], Error>({
    queryKey: ['members', 'search', query],
    queryFn: () => mockApi.searchMembers(query),
    enabled: query.length > 2, // Only search when query is at least 3 characters
  });
};
