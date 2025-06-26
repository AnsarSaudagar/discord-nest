import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  display_name: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ default: false })
  is_email_verified: boolean;

  @CreateDateColumn()
  created_at: Date;
}

