import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import mockApi from '@/lib/mockApi';
import { CannedResponse, CannedResponseInput } from '@/types/canned-responses';

// Hook for fetching all canned responses
export const useCannedResponses = () => {
  return useQuery<CannedResponse[], Error>({
    queryKey: ['cannedResponses'],
    queryFn: mockApi.getCannedResponses,
  });
};

// Hook for fetching a single canned response
export const useCannedResponse = (id: string) => {
  return useQuery<CannedResponse, Error>({
    queryKey: ['cannedResponses', id],
    queryFn: () => mockApi.getCannedResponse(id),
    enabled: !!id,
  });
};

// Hook for creating a new canned response
export const useCreateCannedResponse = () => {
  const queryClient = useQueryClient();

  return useMutation<CannedResponse, Error, CannedResponseInput>({
    mutationFn: mockApi.createCannedResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cannedResponses'] });
    },
  });
};

// Hook for updating an existing canned response
export const useUpdateCannedResponse = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CannedResponse,
    Error,
    { id: string; response: Partial<CannedResponseInput> }
  >({
    mutationFn: ({ id, response }) => mockApi.updateCannedResponse(id, response),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cannedResponses'] });
      queryClient.invalidateQueries({ queryKey: ['cannedResponses', data.id] });
    },
  });
};

// Hook for deleting a canned response
export const useDeleteCannedResponse = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: mockApi.deleteCannedResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cannedResponses'] });
    },
  });
};
