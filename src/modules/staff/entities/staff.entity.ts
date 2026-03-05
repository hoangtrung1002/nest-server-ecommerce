import { Role } from 'src/modules/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  phoneNumber: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  hashedPassword: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'text' })
  imageProfile: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @Column({ type: 'int' })
  updatedBy: number;

  @ManyToMany(() => Role, (role) => role)
  @JoinTable({ name: 'staff_roles' })
  roles: Role[];
}
