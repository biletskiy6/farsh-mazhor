import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from "@nestjs/passport";
import { ApiKeyStrategy } from './apiKey.strategy';
@Module({
  imports: [PassportModule],
  providers: [AuthenticationService, ApiKeyStrategy]
})
export class AuthenticationModule {}
