import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { IsBoolean, IsDecimal, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  excerpt: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Column()
  @IsString()
  price: string;

  @ManyToOne((type) => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @Column({ default: false, type: 'boolean', nullable: true })
  @IsBoolean()
  is_popular: boolean;

  // @RelationId((category: Category) => category.restaurants)
  // category_id: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  cover_image: string;
}
