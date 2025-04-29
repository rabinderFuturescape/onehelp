import { useQuery } from '@tanstack/react-query';
import mockApi from '@/lib/mockApi';
import { Role } from '@/types/escalation';

// Hook for fetching all roles
export const useRoles = () => {
  return useQuery<Role[], Error>({
    queryKey: ['roles'],
    queryFn: mockApi.getRoles,
  });
};
