import { CreateCategoryDto } from './dtos/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { paginateResponse } from '../utils/pagination';
import { join } from 'path';
import * as fs from 'fs';
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
      relations: ['products'],
    });
    return paginateResponse(data, page, limit);
  }
  async fetchOne(id) {
    return this.categoryRepository.findOne(id);
  }
  async update(id, data) {
    if (data.cover_image) {
      const category = await this.categoryRepository.findOne(id);
      const currentImage = category.cover_image;
      try {
        fs.unlinkSync(
          join(process.cwd(), 'public', 'categories', currentImage),
        );
        //file removed
      } catch (err) {
        console.error(err);
      }
    }
    await this.categoryRepository.update(id, { ...data });
  }

  async delete(id) {
    const categoryToDelete = await this.categoryRepository.findOne(id);
    if (categoryToDelete) {
      await this.categoryRepository.delete(id);
      const categoryToDeleteImage = categoryToDelete.cover_image;
      const pathToDelete = join(
        process.cwd(),
        'public',
        'categories',
        categoryToDeleteImage,
      );
      if (fs.existsSync(pathToDelete)) {
        try {
          fs.unlinkSync(pathToDelete);
          //file removed
        } catch (err) {
          console.error(err);
        }
      }
    }
    return this.categoryRepository.delete(id);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(
      this.categoryRepository.create({ ...createCategoryDto }),
    );
  }
}
