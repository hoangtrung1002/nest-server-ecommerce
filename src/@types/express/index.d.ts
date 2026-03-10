import 'express';
import { Customer } from 'src/modules/customer/entities/customer.entity';

declare module 'express' {
  export interface Request {
    user?: Customer;
  }
}
