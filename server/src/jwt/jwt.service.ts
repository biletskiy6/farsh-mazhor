import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  sign,
  verify,
  TokenExpiredError,
  JsonWebTokenError,
} from 'jsonwebtoken';
import { JWT_OPTIONS } from './jwt.constants';
import { UserInputError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';

@Injectable()
export class JwtService {
  constructor(@Inject(JWT_OPTIONS) private jwtOptions) {}
  sign(payload): string {
    const { jwtSecret, expiresIn } = this.jwtOptions;
    return sign(payload, jwtSecret, { expiresIn });
  }
  verify(token) {
    try {
      return verify(token, this.jwtOptions.jwtSecret);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException()
      }
      if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException()
      }
    }
  }
}
