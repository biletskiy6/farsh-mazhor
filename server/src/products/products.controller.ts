import { Role } from 'src/auth/roles.enum';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create.product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async fetchAll(@Query() { limit, page }) {
    return await this.productService.fetchAll({ limit, page });
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
