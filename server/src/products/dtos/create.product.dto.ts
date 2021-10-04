import { InputType, OmitType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends OmitType(Product, ['id']) {}
