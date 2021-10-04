import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create.product.dto';
import { Product } from './entities/product.entity';
import { paginateResponse } from '../utils/pagination';

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
    await this.productRepository.update(id, { ...data });
  }
  async create(CreateProductDto: CreateProductDto) {
    return await this.productRepository.save(
      this.productRepository.create(CreateProductDto),
    );
  }
}
