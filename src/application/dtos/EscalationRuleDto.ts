import { EscalationRule, EscalationTier } from '../../domain/entities/EscalationRule';
import { TicketPriority } from '../../domain/entities/Ticket';

export interface EscalationTierDto {
  id: string;
  level: number;
  assigneeRoleId: string;
  slaHours: number;
}

export interface EscalationRuleDto {
  id: string;
  name: string;
  description: string;
  priority: string;
  timeThresholdMinutes: number;
  tiers: EscalationTierDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEscalationRuleDto {
  name: string;
  description?: string;
  priority: string;
  timeThresholdMinutes: number;
  tiers: {
    level: number;
    assigneeRoleId: string;
    slaHours: number;
  }[];
}

export interface UpdateEscalationRuleDto {
  name?: string;
  description?: string;
  priority?: string;
  timeThresholdMinutes?: number;
  tiers?: {
    id?: string;
    level: number;
    assigneeRoleId: string;
    slaHours: number;
  }[];
}

export function toEscalationRuleDto(rule: EscalationRule): EscalationRuleDto {
  return {
    id: rule.id,
    name: rule.name,
    description: rule.description,
    priority: rule.priority,
    timeThresholdMinutes: rule.timeThresholdMinutes,
    tiers: rule.escalationTiers.map(tier => ({
      id: tier.id,
      level: tier.level,
      assigneeRoleId: tier.assigneeIds[0], // Simplification for demo
      slaHours: tier.timeThresholdMinutes / 60,
    })),
    createdAt: rule.createdAt,
    updatedAt: rule.updatedAt,
  };
}
