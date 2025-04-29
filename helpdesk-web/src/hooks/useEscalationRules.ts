import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import mockApi from '@/lib/mockApi';
import { EscalationRule, EscalationRuleInput } from '@/types/escalation';

// Hook for fetching all escalation rules
export const useEscalationRules = () => {
  return useQuery<EscalationRule[], Error>({
    queryKey: ['escalationRules'],
    queryFn: mockApi.getEscalationRules,
  });
};

// Hook for fetching a single escalation rule
export const useEscalationRule = (id: string) => {
  return useQuery<EscalationRule, Error>({
    queryKey: ['escalationRules', id],
    queryFn: () => mockApi.getEscalationRule(id),
    enabled: !!id,
  });
};

// Hook for creating a new escalation rule
export const useCreateEscalationRule = () => {
  const queryClient = useQueryClient();

  return useMutation<EscalationRule, Error, EscalationRuleInput>({
    mutationFn: mockApi.createEscalationRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escalationRules'] });
    },
  });
};

// Hook for updating an existing escalation rule
export const useUpdateEscalationRule = () => {
  const queryClient = useQueryClient();

  return useMutation<
    EscalationRule,
    Error,
    { id: string; rule: Partial<EscalationRuleInput> }
  >({
    mutationFn: ({ id, rule }) => mockApi.updateEscalationRule(id, rule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escalationRules'] });
    },
  });
};

// Hook for deleting an escalation rule
export const useDeleteEscalationRule = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: mockApi.deleteEscalationRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escalationRules'] });
    },
  });
};
