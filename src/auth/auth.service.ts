import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { EmailService } from "../email/email.service";

export interface JwtPayload extends jwt.JwtPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async signup(dto: SignUpDto) {
    const user = await this.usersService.create(dto);

    await this.emailService.sendMail(
      dto.email,
      "Welcome",
      "Hello",
      "<p>code is 1111</p>",
    );

    return user;
  }

  async signin(dto: SignInDto): Promise<string> {
    const user = await this.usersService.findUsername(dto.username);

    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const token = await this.jwtService.signAsync({
      userId: user.id,
    });

    return token;
  }
}
