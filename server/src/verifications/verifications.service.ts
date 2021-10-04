import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { Repository } from 'typeorm';
import { UserService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class VerificationsService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async verify(activationLink) {
    const verification = await this.verificationRepository.findOne(
      {
        activation_link: activationLink,
      },
      { loadRelationIds: true },
    );
    if (!verification)
      throw new HttpException(
        'Wrong activation link',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.userService.verifyUserEmail(verification.user);
  }

  async buildActivationLinkFor(user) {
    const userWithActivationLink = await this.verificationRepository.save(
      this.verificationRepository.create({
        activation_link: uuid.v4(),
        user,
      }),
    );
    return `${this.configService.get('APP_URL')}api/v1/auth/email/verify/${
      userWithActivationLink.activation_link
    }`;
  }
}
