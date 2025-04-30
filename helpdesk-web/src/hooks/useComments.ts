import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentInput } from '@/types/comments';
import { api } from '@/lib/api';

// Hook for fetching comments for a ticket
export const useTicketComments = (ticketId: string) => {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', ticketId],
    queryFn: () => api.get(`/comments/ticket/${ticketId}`).then(res => res.data),
    enabled: !!ticketId,
  });
};

// Hook for creating a new comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, { ticketId: string; comment: CommentInput }>({
    mutationFn: ({ ticketId, comment }) => 
      api.post('/comments', { ...comment, ticketId }).then(res => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.ticketId] });
    },
  });
};

// Hook for updating a comment
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Comment,
    Error,
    { id: string; ticketId: string; comment: Partial<CommentInput> }
  >({
    mutationFn: ({ id, comment }) => 
      api.put(`/comments/${id}`, comment).then(res => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.ticketId] });
    },
  });
};

// Hook for deleting a comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; ticketId: string }>({
    mutationFn: ({ id }) => api.delete(`/comments/${id}`).then(res => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.ticketId] });
    },
  });
};
