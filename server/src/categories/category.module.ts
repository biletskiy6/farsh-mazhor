import { CategoryController } from './category.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Category } from "./entities/category.entity";
import { CategoryService } from './category.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}