import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create.product.dto';
import { Product } from './entities/product.entity';
import { paginateResponse } from '../utils/pagination';
import * as fs from 'fs';
import { join } from 'path';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async fetchPopularProducts(limit, page) {
    const skip = (page - 1) * limit;
    const data = await this.productRepository.findAndCount({
      take: limit,
      skip,
      where: { is_popular: true },
      relations: ['category'],
    });
    return paginateResponse(data, page, limit);
  }
  async fetchAllProducts(limit, page) {
    const skip = (page - 1) * limit;
    const data = await this.productRepository.findAndCount({
      take: limit,
      skip,
      relations: ['category'],
    });
    return paginateResponse(data, page, limit);
  }
  async fetchAll({ limit, page = 1, type }) {
    return type === 'popular'
      ? this.fetchPopularProducts(limit, page)
      : this.fetchAllProducts(limit, page);
  }

  async fetchOne(id) {
    return await this.productRepository.findOne(id, {
      relations: ['category'],
    });
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
    return await this.productRepository.update(id, { ...data });
  }
  async delete(id) {
    const productToDelete = await this.productRepository.findOne(id);
    if (productToDelete) {
      await this.productRepository.delete(id);
      const productToDeleteImage = productToDelete.cover_image;
      const pathToDelete = join(
        process.cwd(),
        'public',
        'products',
        productToDeleteImage,
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

  async create(CreateProductDto: CreateProductDto) {
    return await this.productRepository.save(
      this.productRepository.create(CreateProductDto),
    );
  }
}
