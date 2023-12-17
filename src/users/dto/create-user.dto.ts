import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateUserSchema = z.object({
  fullName: z.string(),
  phone: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
