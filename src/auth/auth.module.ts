import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "secret",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
