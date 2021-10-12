import { User } from 'src/users/entities/user.entity';
import { RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtMiddleware } from 'src/jwt/jwt.middleware';
import { Product } from './entities/product.entity';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { UserService } from 'src/users/users.service';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product, User])],
  providers: [ProductService, UserService],
})



export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude( { path: 'products', method: RequestMethod.GET },)
      .forRoutes(ProductController);
  }
}
