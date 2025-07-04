import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { Organization } from '../../entities/organization.entity';

export enum MemberRole {
  MEMBER = 1,
  ADMIN = 2,
  OWNER = 3,
  MODERATOR = 4,
}

// Status constants
export enum MemberStatus {
  PENDING = 0,
  ACTIVE = 1,
  SUSPENDED = 2,
  BANNED = 3,
  REJECTED = 4,
}

@Entity('org_members')
export class OrgMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'organization_id' })
  organization_id: number;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ type: 'int', default: MemberRole.MEMBER })
  role: number;

  @Column({ type: 'int', default: MemberStatus.ACTIVE })
  status: number;

  @CreateDateColumn()
  created_at: Date;
}
