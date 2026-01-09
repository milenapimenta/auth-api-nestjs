import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma/prisma.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'banana',
      signOptions: { expiresIn: '1d' },
    }),
    RedisModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
