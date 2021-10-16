import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as passport from "passport"
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('authentication middleware');
    passport.authenticate('headerapikey', { session: false, failureRedirect: "/api/unauthorized" }, (value) =>{
      if(!value) throw new UnauthorizedException()
      return next()
    })(req, res, next)
  }
}
