import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  fullName: z.string(),
  phone: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
