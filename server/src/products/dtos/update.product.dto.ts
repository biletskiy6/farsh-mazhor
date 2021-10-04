import {
  ArgsType,
  Field,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './create.product.dto';

@InputType()
export class UpdateProductInput extends PartialType(
  CreateProductDto,
  InputType,
) {}

@ArgsType()
export class UpdateProductDto {
  @Field((type) => Number)
  id: number;
  @Field((type) => UpdateProductInput)
  data: UpdateProductInput;
}
