import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthUser } from './auth-user.decorator';
import { ProfileInput } from './dtos/profile.dto';
import { GraphQLError } from 'graphql';
import { UpdateProfileInput } from './dtos/update-profile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser) {
    return authUser;
  }

  @Put('me')
  @UseGuards(AuthGuard)
  async updateProfileInput(
    @Body() updateProfileInput: UpdateProfileInput,
    @AuthUser('id') authUserId,
  ) {
    return await this.userService.updateProfile(authUserId, updateProfileInput);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async profile(@Param() { id }) {
    return await this.userService.findById(id);
  }
}
