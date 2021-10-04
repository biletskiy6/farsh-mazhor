import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '../jwt/jwt.service';
import { UpdateProfileInput } from './dtos/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async updateProfile(
    authUserId: number,
    updateProfileInput: UpdateProfileInput,
  ) {
    return await this.userRepository.save(
      this.userRepository.create({ id: authUserId, ...updateProfileInput }),
    );
  }
  async verifyUserEmail(id): Promise<User> {
    const user = await this.findById(id);
    return await this.userRepository.save({ ...user, email_verified: true });
  }
  findById(id) {
    return this.userRepository.findOne({ id });
  }
}
