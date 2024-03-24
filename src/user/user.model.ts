import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    const now = new Date().getTime();

    this.id = randomUUID();
    this.login = partial.login;
    this.password = partial.password;
    this.version = 1;
    this.createdAt = now;
    this.updatedAt = now;
  }
}
