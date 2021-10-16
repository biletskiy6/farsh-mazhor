import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(request: Request, response: Response, next: NextFunction) {
    console.log('jwt middleware');
    const headers = request.headers;
    const authorization = headers.authorization;
    if (!authorization) return next();
    const token = authorization.split(' ')[1];
    if (token) {
      const decodedToken = this.jwtService.verify(token.toString());
      const user = await this.userService.findById(decodedToken['id']);
      request['user'] = user.excludePassword();
    }
    next();
  }
}
