import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EscalationTier } from '../../../domain/entities/EscalationRule';
import { EscalationRuleEntity } from './EscalationRuleEntity';

@Entity('escalation_tiers')
export class EscalationTierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: number;

  @Column('simple-array')
  assigneeIds: string[];

  @Column()
  timeThresholdMinutes: number;

  @Column()
  escalationRuleId: string;

  @ManyToOne(() => EscalationRuleEntity, (rule) => rule.escalationTiers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'escalationRuleId' })
  escalationRule: EscalationRuleEntity;

  toDomain(): EscalationTier {
    return new EscalationTier(
      this.id,
      this.level,
      this.assigneeIds,
      this.timeThresholdMinutes,
    );
  }

  static fromDomain(tier: EscalationTier, rule: EscalationRuleEntity): EscalationTierEntity {
    const entity = new EscalationTierEntity();
    entity.id = tier.id;
    entity.level = tier.level;
    entity.assigneeIds = tier.assigneeIds;
    entity.timeThresholdMinutes = tier.timeThresholdMinutes;
    entity.escalationRule = rule;
    entity.escalationRuleId = rule.id;
    return entity;
  }
}
