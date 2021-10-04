import { CoreEntity } from './entities/core.entity';
import { Body, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CommonService } from './common.service';


export class CommonController<T extends CoreEntity> {
    constructor(private readonly commonService: CommonService<T>){}
    @Get()
    async findAll() {
        return this.commonService.findAll()
    }

    @Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 400, description: 'Bad Request.'})
	async create(@Body() entity: T): Promise<number> {
        console.log(entity);
		return this.commonService.create(entity);
	}
}