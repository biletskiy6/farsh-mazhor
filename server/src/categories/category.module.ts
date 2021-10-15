import { ProductController } from './../products/products.controller';
import { JwtMiddleware } from './../jwt/jwt.middleware';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, RequestMethod, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { Category } from "./entities/category.entity";
import { CategoryService } from './category.service';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';



@Module({
    controllers: [CategoryController],
    providers: [CategoryService, UserService],
    imports: [TypeOrmModule.forFeature([Category, User])],
})

export class CategoryModule implements NestModule {
      configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(JwtMiddleware)
          .forRoutes(
            { path: 'categories', method: RequestMethod.POST },
            { path: 'categories', method: RequestMethod.PUT },
            { path: 'categories', method: RequestMethod.DELETE },
          );
      }
}
