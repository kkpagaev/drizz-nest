import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(to: string, subject: string, text: string, html: string) {
    const info = await this.mailerService.sendMail({
      from: "GQbN6@example.com",
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);

    return;
  }
}
