import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}
