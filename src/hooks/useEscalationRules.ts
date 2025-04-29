import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { EscalationRule, EscalationRuleInput } from '@/types/escalation';

// API endpoints
const ESCALATION_RULES_ENDPOINT = '/escalation-rules';

// Fetch all escalation rules
const fetchEscalationRules = async (): Promise<EscalationRule[]> => {
  const response = await api.get(ESCALATION_RULES_ENDPOINT);
  return response.data;
};

// Create a new escalation rule
const createEscalationRule = async (rule: EscalationRuleInput): Promise<EscalationRule> => {
  const response = await api.post(ESCALATION_RULES_ENDPOINT, rule);
  return response.data;
};

// Update an existing escalation rule
const updateEscalationRule = async ({
  id,
  rule,
}: {
  id: string;
  rule: Partial<EscalationRuleInput>;
}): Promise<EscalationRule> => {
  const response = await api.put(`${ESCALATION_RULES_ENDPOINT}/${id}`, rule);
  return response.data;
};

// Delete an escalation rule
const deleteEscalationRule = async (id: string): Promise<void> => {
  await api.delete(`${ESCALATION_RULES_ENDPOINT}/${id}`);
};

// Hook for fetching all escalation rules
export const useEscalationRules = () => {
  return useQuery<EscalationRule[], Error>({
    queryKey: ['escalationRules'],
    queryFn: fetchEscalationRules,
  });
};

// Hook for creating a new escalation rule
export const useCreateEscalationRule = () => {
  const queryClient = useQueryClient();

  return useMutation<EscalationRule, Error, EscalationRuleInput>({
    mutationFn: createEscalationRule,
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
    mutationFn: updateEscalationRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escalationRules'] });
    },
  });
};

// Hook for deleting an escalation rule
export const useDeleteEscalationRule = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteEscalationRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escalationRules'] });
    },
  });
};
