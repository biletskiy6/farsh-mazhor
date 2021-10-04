import { Product } from '../../products/entities/product.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity()
export class Category extends CoreEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  cover_image?: string;

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];

  // @RelationId((restaurant: Restaurant) => restaurant.category_id)
  // restaurantsIds: number[]
}
