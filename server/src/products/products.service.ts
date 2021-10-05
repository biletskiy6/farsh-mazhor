import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create.product.dto';
import { Product } from './entities/product.entity';
import { paginateResponse } from '../utils/pagination';
import fs from 'fs';
import { join } from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async fetchAll({ limit, page = 1 }) {
    const skip = (page - 1) * limit;
    const data = await this.productRepository.findAndCount({
      take: limit,
      skip,
      relations: ['category'],
    });
    return paginateResponse(data, page, limit);
  }
  async update(id, data) {
    if (data.cover_image) {
      const category = await this.productRepository.findOne(id);
      const currentImage = category.cover_image;
      try {
        fs.unlinkSync(join(process.cwd(), 'public', 'products', currentImage));
        //file removed
      } catch (err) {
        console.error(err);
      }
    }
    await this.productRepository.update(id, { ...data });
  }
  async create(CreateProductDto: CreateProductDto) {
    return await this.productRepository.save(
      this.productRepository.create(CreateProductDto),
    );
  }
}
