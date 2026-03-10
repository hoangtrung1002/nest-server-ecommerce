import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomerService } from 'src/modules/customer/customer.service';
import { Customer } from 'src/modules/customer/entities/customer.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly customerService: CustomerService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Customer> {
    return await this.customerService.validateCustomer(email, password);
  }
}
