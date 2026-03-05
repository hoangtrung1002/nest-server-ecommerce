import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

export enum Privilege {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  MANAGE = 'MANAGE',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', array: true, default: [] })
  privileges: Privilege[];

  @ManyToMany(() => Staff, (staff) => staff.roles)
  staffs: Staff[];
}
