import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { HelpTopic, HelpTopicPriority, HelpTopicVisibility, HelpTopicStatus } from '../../../domain/entities/HelpTopic';
import { RoleEntity } from './RoleEntity';

@Entity('help_topics')
export class HelpTopicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  parentId: string | null;

  @ManyToOne(() => HelpTopicEntity, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: HelpTopicEntity;

  @Column({ nullable: true })
  autoAssignRoleId: string | null;

  @ManyToOne(() => RoleEntity, { nullable: true })
  @JoinColumn({ name: 'autoAssignRoleId' })
  autoAssignRole: RoleEntity;

  @Column({
    type: 'enum',
    enum: HelpTopicPriority,
    default: HelpTopicPriority.MEDIUM,
  })
  priority: HelpTopicPriority;

  @Column({ default: 24 })
  dueHours: number;

  @Column({
    type: 'enum',
    enum: HelpTopicVisibility,
    default: HelpTopicVisibility.PUBLIC,
  })
  visibility: HelpTopicVisibility;

  @Column({
    type: 'enum',
    enum: HelpTopicStatus,
    default: HelpTopicStatus.ACTIVE,
  })
  status: HelpTopicStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): HelpTopic {
    return new HelpTopic(
      this.id,
      this.name,
      this.description,
      this.parentId,
      this.autoAssignRoleId,
      this.priority,
      this.dueHours,
      this.visibility,
      this.status,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(helpTopic: HelpTopic): HelpTopicEntity {
    const entity = new HelpTopicEntity();
    entity.id = helpTopic.id;
    entity.name = helpTopic.name;
    entity.description = helpTopic.description;
    entity.parentId = helpTopic.parentId;
    entity.autoAssignRoleId = helpTopic.autoAssignRoleId;
    entity.priority = helpTopic.priority;
    entity.dueHours = helpTopic.dueHours;
    entity.visibility = helpTopic.visibility;
    entity.status = helpTopic.status;
    entity.createdAt = helpTopic.createdAt;
    entity.updatedAt = helpTopic.updatedAt;
    return entity;
  }
}
