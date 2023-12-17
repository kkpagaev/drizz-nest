import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";

export interface JwtPayload extends jwt.JwtPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    return await this.usersService.create(dto);
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
