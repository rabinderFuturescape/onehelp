import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import mockApi from '@/lib/mockApi';
import { HelpTopic, HelpTopicInput } from '@/types/help-topics';

// Hook for fetching all help topics
export const useHelpTopics = () => {
  return useQuery<HelpTopic[], Error>({
    queryKey: ['helpTopics'],
    queryFn: mockApi.getHelpTopics,
  });
};

// Hook for fetching a single help topic
export const useHelpTopic = (id: string) => {
  return useQuery<HelpTopic, Error>({
    queryKey: ['helpTopics', id],
    queryFn: () => mockApi.getHelpTopic(id),
    enabled: !!id,
  });
};

// Hook for creating a new help topic
export const useCreateHelpTopic = () => {
  const queryClient = useQueryClient();

  return useMutation<HelpTopic, Error, HelpTopicInput>({
    mutationFn: mockApi.createHelpTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helpTopics'] });
    },
  });
};

// Hook for updating an existing help topic
export const useUpdateHelpTopic = () => {
  const queryClient = useQueryClient();

  return useMutation<
    HelpTopic,
    Error,
    { id: string; topic: Partial<HelpTopicInput> }
  >({
    mutationFn: ({ id, topic }) => mockApi.updateHelpTopic(id, topic),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['helpTopics'] });
      queryClient.invalidateQueries({ queryKey: ['helpTopics', data.id] });
    },
  });
};

// Hook for deleting a help topic
export const useDeleteHelpTopic = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: mockApi.deleteHelpTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helpTopics'] });
    },
  });
};
