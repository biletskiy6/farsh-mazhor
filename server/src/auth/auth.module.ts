import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { VerificationsService } from '../verifications/verifications.service';
import { Verification } from '../verifications/entities/verification.entity';
import { UserService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  controllers: [AuthController],
  providers: [AuthService, VerificationsService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
