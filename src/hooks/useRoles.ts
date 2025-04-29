import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Role } from '@/types/escalation';

// API endpoint
const ROLES_ENDPOINT = '/roles';

// Fetch all roles
const fetchRoles = async (): Promise<Role[]> => {
  const response = await api.get(ROLES_ENDPOINT);
  return response.data;
};

// Hook for fetching all roles
export const useRoles = () => {
  return useQuery<Role[], Error>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });
};
