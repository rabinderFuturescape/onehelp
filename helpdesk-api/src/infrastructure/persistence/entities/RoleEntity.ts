import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../../domain/entities/Role';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  permissions: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): Role {
    return new Role(
      this.id,
      this.name,
      this.description,
      this.permissions,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(role: Role): RoleEntity {
    const entity = new RoleEntity();
    entity.id = role.id;
    entity.name = role.name;
    entity.description = role.description;
    entity.permissions = role.permissions;
    entity.createdAt = role.createdAt;
    entity.updatedAt = role.updatedAt;
    return entity;
  }
}
