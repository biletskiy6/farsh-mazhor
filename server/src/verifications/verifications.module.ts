import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { UserService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verification, User])],
  providers: [VerificationsService, UserService],
  exports: [VerificationsService],
})
export class VerificationsModule {}
