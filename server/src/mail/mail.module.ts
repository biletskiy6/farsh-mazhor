import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MAIL_OPTIONS } from './mail.constants';

@Global()
@Module({})
export class MailModule {
  static forRoot(options): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: MAIL_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
      exports: [MailService],
    };
  }
}
