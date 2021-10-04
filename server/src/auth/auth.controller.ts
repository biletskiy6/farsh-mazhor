import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountInput } from '../users/dtos/create-account.dto';
import { LoginInput } from '../users/dtos/login.dto';
import { VerificationsService } from '../verifications/verifications.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationService: VerificationsService,
  ) {}
  @Get('email/verify/:activationLink')
  @Redirect('https://google.com', 301)
  async verify(@Param() { activationLink }) {
    await this.verificationService.verify(activationLink);
  }
  @Post('login')
  login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Post('register')
  register(@Body() createAccountInput: CreateAccountInput) {
    return this.authService.register(createAccountInput);
  }
}
