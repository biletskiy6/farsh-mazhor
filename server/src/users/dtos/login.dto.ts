import { PickType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/outputs/core-output';
import { User } from '../entities/user.entity';

export class LoginInput extends PickType(User, ['email', 'password']) {}
export class LoginOutput extends CoreOutput {}
