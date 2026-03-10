import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { compare } from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  private SELECT_FIELDS: Array<keyof Customer> = [
    'id',
    'firstName',
    'lastName',
    'phoneNumber',
    'isActive',
    'createdAt',
  ];

  async signUp(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.findByEmail(createCustomerDto.email);

    if (existingCustomer)
      throw new ConflictException('A customer with this email already exists.');

    const newCustomer = this.customerRepo.create({ ...createCustomerDto });
    await this.customerRepo.save(newCustomer);
    return { message: 'Sign up successfully' };
  }

  async validateCustomer(email: string, password: string) {
    const customer = await this.findByEmail(email);
    if (!customer) throw new UnauthorizedException('Customer not found');

    const isPasswordValid = await compare(password, customer.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return customer;
  }

  async findAll() {
    return await this.customerRepo.find({
      relations: { addresses: true },
      select: this.SELECT_FIELDS,
    });
  }

  async findByEmail(email: string) {
    return await this.customerRepo.findOneBy({ email });
  }

  async findOne(id: number) {
    return await this.customerRepo.find({
      relations: { addresses: true },
      where: {
        id: id,
      },
      select: this.SELECT_FIELDS,
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} ${updateCustomerDto.email} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
