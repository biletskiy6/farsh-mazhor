import { Category } from './../entities/category.entity';
import { OmitType } from '@nestjs/mapped-types';


export class CreateCategoryDto extends OmitType(Category, ['id']) {}
