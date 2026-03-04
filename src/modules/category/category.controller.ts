import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.findOne(id);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
