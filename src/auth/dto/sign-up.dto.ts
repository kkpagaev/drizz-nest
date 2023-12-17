import { createZodDto } from "nestjs-zod";
import { CreateUserSchema } from "../../users/dto/create-user.dto";

export const SignUpSchema = CreateUserSchema;

export class SignUpDto extends createZodDto(SignUpSchema) {}
