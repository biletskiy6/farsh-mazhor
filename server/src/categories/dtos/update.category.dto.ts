import { PickType } from '@nestjs/mapped-types';
import { Category } from '../entities/category.entity';

export class UpdateCategoryDto extends PickType(Category, [
  'id',
  'name',
  'description',
  'order',
]) {}
