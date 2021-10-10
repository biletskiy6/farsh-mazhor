import { Product } from '../../products/entities/product.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import slugify from 'slugify';
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
  slug: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  cover_image?: string;

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];

  @Column({ nullable: true, default: 0 })
  @IsOptional()
  @IsNumber()
  order: number;

  // @RelationId((restaurant: Restaurant) => restaurant.category_id)
  // restaurantsIds: number[]
  @BeforeInsert()
  transformSlug() {
    this.slug = slugify(this.name, {
      lower: true,
    });
  }
}
