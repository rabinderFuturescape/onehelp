import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentInput } from '@/types/comments';
import mockApi from '@/lib/mockApi';

// Hook for fetching comments for a ticket
export const useTicketComments = (ticketId: string) => {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', ticketId],
    queryFn: () => mockApi.getTicketComments(ticketId),
    enabled: !!ticketId,
  });
};

// Hook for creating a new comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, { ticketId: string; comment: CommentInput }>({
    mutationFn: ({ ticketId, comment }) => mockApi.createComment(ticketId, comment),
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
    mutationFn: ({ id, comment }) => mockApi.updateComment(id, comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.ticketId] });
    },
  });
};

// Hook for deleting a comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; ticketId: string }>({
    mutationFn: ({ id }) => mockApi.deleteComment(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.ticketId] });
    },
  });
};
