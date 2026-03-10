import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCustomer(email: string, password: string) {
    return await this.customerService.validateCustomer(email, password);
  }

  async signIn(customer: Customer | undefined) {
    if (!customer) throw new BadRequestException();
    // create access token
    const accessToken = await this.jwtService.signAsync({ id: customer.id });
    return { message: 'Sign in successfully', accessToken };
  }
}
