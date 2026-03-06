import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.customerRepo.findOneBy({
      email: createCustomerDto.email,
    });

    if (existingCustomer)
      throw new ConflictException('A customer with this email already exists.');

    const newCustomer = this.customerRepo.create({ ...createCustomerDto });
    return await this.customerRepo.save(newCustomer);
  }

  async findAll() {
    return await this.customerRepo.find({ relations: { addresses: true } });
  }

  async findOne(id: number) {
    return await this.customerRepo.find({
      relations: { addresses: true },
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} ${updateCustomerDto.email} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
