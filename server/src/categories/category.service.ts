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
      order: {
        order: 'ASC',
      },
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

  async changeOrder({ dndItems }) {
    for (let i = 0; i < dndItems.length; i++) {
      const thisItem = dndItems[i];
      // const item = await this.categoryRepository.findOne({ id: thisItem.id });
      await this.categoryRepository.update(thisItem.id, {
        ...thisItem.id,
        order: i + 1,
      });
    }
    return true;
    // const fromItem = await this.categoryRepository.findOne({ id: from.id });
    // const toItem = await this.categoryRepository.findOne({ id: to.id });
    // console.log(fromItem, toItem, oldIndex, newIndex);
    // if (fromItem && toItem) {
    //   await this.categoryRepository.update(fromItem.id, {
    //     ...fromItem,
    //     order: newIndex + 1,
    //   });
    //   await this.categoryRepository.update(toItem.id, {
    //     ...toItem,
    //     order: oldIndex + 1,
    //   });
    //   return true;
    // }
    // const orderedItemsIds = orderedItems.map((item) => item.id);
    // console.log(orderedItemsIds);
    // const currentCategories = await this.categoryRepository.find();
    // await this.categoryRepository.update();
    // return currentCategories;
  }

  async delete(id) {
    const categoryToDelete = await this.categoryRepository.findOne(id);
    if (categoryToDelete) {
      await this.categoryRepository.delete(id);
      const categoryToDeleteImage = categoryToDelete.cover_image;

      if (categoryToDeleteImage) {
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
    }
    return this.categoryRepository.delete(id);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(
      this.categoryRepository.create({ ...createCategoryDto }),
    );
  }
}
