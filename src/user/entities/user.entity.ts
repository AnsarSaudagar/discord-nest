import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ default: 0 })
  is_email_verified: boolean;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ default: 1 })
  is_active: boolean;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  provider: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  
}
