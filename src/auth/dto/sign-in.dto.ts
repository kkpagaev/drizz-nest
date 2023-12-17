import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export class SignInDto extends createZodDto(SignInSchema) {}
