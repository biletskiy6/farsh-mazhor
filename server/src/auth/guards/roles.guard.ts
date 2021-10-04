import { ROLES_KEY } from './../decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userRoles = [...user.roles];
    const userRolesSlugs = userRoles.map((userRole) => userRole.slug);
    return requiredRoles.some((role) => userRolesSlugs?.includes(role));
  }
}
