import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUser } from './user.model';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public getAllUsers() {
    return this.prisma.user.findMany({
      select: this.prisma.exclude('User', ['password']),
    });
  }

  async getUser(id: string) {
    return await this.getUserEntity(id, true);
  }

  public createUser(dto: CreateUserDto) {
    const { login, password } = dto;
    return this.prisma.user.create({
      data: { login, password, version: 1 },
      select: this.prisma.exclude('User', ['password']),
    });
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.getUserEntity(id);

    this.checkOldPassword(user, dto.oldPassword);

    return this.prisma.user.update({
      where: { id },
      data: { password: dto.newPassword, version: (user.version += 1) },
      select: this.prisma.exclude('User', ['password']),
    });
  }

  public async deleteUser(id: string) {
    await this.getUserEntity(id);
    await this.prisma.user.delete({ where: { id } });
  }

  private checkOldPassword(user: IUser, oldPassword: string) {
    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Wrong old password`);
    }
  }

  private async getUserEntity(
    id: string,
    excludePassword?: false,
  ): Promise<IUser>;
  private async getUserEntity(
    id: string,
    excludePassword: true,
  ): Promise<Omit<IUser, 'password'>>;
  private async getUserEntity(id: string, excludePassword = false) {
    const user: IUser | Omit<IUser, 'password'> =
      await this.prisma.user.findUnique({
        where: { id },
        select: excludePassword
          ? this.prisma.exclude('User', ['password'])
          : undefined,
      });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }
}
