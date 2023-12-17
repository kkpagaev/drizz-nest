import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => {
        return {
          transport: {
            host: config.get("SMTP_HOST"),
            port: +config.get("SMTP_PORT"),
            secure: false,
          },
        };
      },
    }),
  ],
  providers: [EmailService],
})
export class EmailModule {}
