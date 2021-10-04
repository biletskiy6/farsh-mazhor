import { CoreEntity } from './entities/core.entity';
import { BadGatewayException, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
@Injectable()
export class CommonService<T extends CoreEntity> {
    constructor(private readonly genericRepository: Repository<T>) {}
    async findAll() {
        try {
             return this.genericRepository.find()
        } catch(error) {
            throw new BadGatewayException(error);
        }
    }
     create(entity: any): Promise<number>{
	  try {
		return new Promise<number> ((resolve, reject) => {
			this.genericRepository.save(entity)
			.then(created=> resolve(created.id))
			.catch(err => reject(err))
			})
		}
		catch(error) {
			throw new BadGatewayException(error);
		}
  }
}