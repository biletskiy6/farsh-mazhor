import { CreateCategoryDto } from './dtos/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { paginateResponse } from '../utils/pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll({ limit, page }) {
    const skip = (page - 1) * limit;
    const data = await this.categoryRepository.findAndCount({
      take: limit,
      skip,
    });
    return paginateResponse(data, page, limit);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(
      this.categoryRepository.create({ ...createCategoryDto }),
    );
  }
}
