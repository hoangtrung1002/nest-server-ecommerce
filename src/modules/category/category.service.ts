import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoryRepository.find({
      where: { parentId: IsNull() },
      relations: { children: true },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        children: {
          id: true,
          name: true,
        },
      },
    });

    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.find({
      where: { id },
      relations: { children: true },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        children: {
          id: true,
          name: true,
        },
      },
    });

    return category;
  }
}
