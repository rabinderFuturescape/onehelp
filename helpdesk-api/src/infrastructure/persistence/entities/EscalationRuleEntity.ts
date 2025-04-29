import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { EscalationRule } from '../../../domain/entities/EscalationRule';
import { TicketPriority } from '../../../domain/entities/Ticket';
import { EscalationTierEntity } from './EscalationTierEntity';

@Entity('escalation_rules')
export class EscalationRuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TicketPriority,
  })
  priority: TicketPriority;

  @Column()
  timeThresholdMinutes: number;

  @OneToMany(() => EscalationTierEntity, (tier) => tier.escalationRule, {
    cascade: true,
    eager: true,
  })
  escalationTiers: EscalationTierEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): EscalationRule {
    return new EscalationRule(
      this.id,
      this.name,
      this.description,
      this.priority,
      this.timeThresholdMinutes,
      this.escalationTiers.map((tier) => tier.toDomain()),
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(rule: EscalationRule): EscalationRuleEntity {
    const entity = new EscalationRuleEntity();
    entity.id = rule.id;
    entity.name = rule.name;
    entity.description = rule.description;
    entity.priority = rule.priority;
    entity.timeThresholdMinutes = rule.timeThresholdMinutes;
    entity.escalationTiers = rule.escalationTiers.map((tier) =>
      EscalationTierEntity.fromDomain(tier, entity),
    );
    entity.createdAt = rule.createdAt;
    entity.updatedAt = rule.updatedAt;
    return entity;
  }
}
