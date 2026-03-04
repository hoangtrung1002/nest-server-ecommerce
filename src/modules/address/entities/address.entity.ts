import { Customer } from 'src/modules/customer/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  addressLine1: string;

  @Column({ type: 'text', nullable: true })
  addressLine2: string;

  @Column({ type: 'varchar', length: 50 })
  portalCode: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @ManyToOne(() => Customer, (customer) => customer.addresses)
  @JoinTable({ name: 'customerId' })
  customer: Customer;
}
