import { useState } from 'react';

// Mock member data
const mockMembers = [
  {
    id: '101',
    name: 'John Doe',
    email: 'john.doe@example.com',
    unitNumber: 'A101',
    phone: '+1234567890',
    status: 'active',
  },
  {
    id: '102',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    unitNumber: 'B202',
    phone: '+1987654321',
    status: 'active',
  },
  {
    id: '103',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1122334455',
    status: 'inactive',
  },
  {
    id: '104',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    unitNumber: 'C303',
    phone: '+1555666777',
    status: 'active',
  },
];

// Hook for fetching members
export const useMembers = (filters = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return {
    data: mockMembers,
    isLoading,
    error,
  };
};
