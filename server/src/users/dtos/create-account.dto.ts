import { OmitType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/outputs/core-output';
import { User } from '../entities/user.entity';
export class CreateAccountInput extends OmitType(User, ['id']) {}
export class CreateAccountOutput extends CoreOutput {}
