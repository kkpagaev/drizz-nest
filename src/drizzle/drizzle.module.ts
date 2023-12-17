import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as schema from '../schema';
import { PgRemoteDatabase } from 'drizzle-orm/pg-proxy';
import { createDrizzle } from '../db';

export const InjectDrizzle = () => Inject('DRIZZLE_CONNECTION');

export type Drizzle = PgRemoteDatabase<typeof schema>;

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'DRIZZLE_CONNECTION',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const { client, db } = createDrizzle(
          config.get('DB_URL') || 'postgres://user:user@localhost:7778/user',
        );
        await client.connect();

        return db;
      },
    },
  ],
  exports: ['DRIZZLE_CONNECTION'],
})
export class DrizzleModule {}
