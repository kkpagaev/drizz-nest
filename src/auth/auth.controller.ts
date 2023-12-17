import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: SignUpDto) {
    return await this.authService.signup(dto);
  }

  @Post("signin")
  async signin(@Body() dto: SignInDto) {
    const token = await this.authService.signin(dto);

    return {
      token,
    };
  }
}
