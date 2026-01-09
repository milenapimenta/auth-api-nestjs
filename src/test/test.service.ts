import { Injectable, Inject } from '@nestjs/common';
import type Redis from 'ioredis';
import { REDIS } from '../redis/redis.provider';

@Injectable()
export class TestService {
  constructor(@Inject(REDIS) private readonly redis: Redis) {}

  async testRedis() {
    await this.redis.set('test', 'ok', 'EX', 30);

    const value = await this.redis.get('test');
    console.log('Redis value:', value);

    return value;
  }
}
