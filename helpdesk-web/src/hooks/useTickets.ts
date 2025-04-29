import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import mockApi from '@/lib/mockApi';
import { Ticket, TicketInput } from '@/types/tickets';

// Types for filter parameters
export interface TicketFilters {
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

// Hook for fetching all tickets with optional filters
export const useTickets = (filters?: TicketFilters) => {
  return useQuery<Ticket[], Error>({
    queryKey: ['tickets', filters],
    queryFn: () => mockApi.getTickets(filters),
  });
};

// Hook for fetching a single ticket
export const useTicket = (id: string) => {
  return useQuery<Ticket, Error>({
    queryKey: ['tickets', id],
    queryFn: () => mockApi.getTicket(id),
    enabled: !!id,
  });
};

// Hook for creating a new ticket
export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<Ticket, Error, TicketInput>({
    mutationFn: mockApi.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

// Hook for updating an existing ticket
export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Ticket,
    Error,
    { id: string; ticket: Partial<TicketInput> }
  >({
    mutationFn: ({ id, ticket }) => mockApi.updateTicket(id, ticket),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['tickets', data.id] });
    },
  });
};

// Hook for deleting a ticket
export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: mockApi.deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};
