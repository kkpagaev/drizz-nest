import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Drizzle, InjectDrizzle } from '../drizzle/drizzle.module';
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private readonly db: Drizzle) {}

  async create(dto: CreateUserDto) {
    const password = await hash(dto.password, 10);

    const user = await this.db
      .insert(users)
      .values({
        username: dto.username,
        password: password,
        email: dto.email,
        fullName: dto.fullName,
        phone: dto.phone,
      })
      .returning();

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const newPassword = dto.password ? await hash(dto.password, 10) : undefined;

    const user = await this.db
      .update(users)
      .set({
        username: dto.username,
        email: dto.email,
        fullName: dto.fullName,
        phone: dto.phone,
        password: newPassword,
      })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async remove(id: number) {
    return this.db.delete(users).where(eq(users.id, id));
  }
}
