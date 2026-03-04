import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productsRepository.save(createProductDto);
    return { message: 'Your product is created.', data: product };
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException();

    return { data: product };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update({ id }, updateProductDto);
  }

  async remove(id: number) {
    return await this.productsRepository.delete(id);
  }
}
