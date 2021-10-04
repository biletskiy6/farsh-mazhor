import { User } from '../entities/user.entity';

import { CoreOutput } from '../../common/outputs/core-output';
import { PickType } from '@nestjs/mapped-types';

export class ProfileInput extends PickType(User, ['id']) {}
export class ProfileOutput extends CoreOutput {}
