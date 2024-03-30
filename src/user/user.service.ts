import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUser } from './user.model';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    this.prisma = Object.assign(
      prisma,
      prisma.$extends({
        query: {
          user: {
            async $allOperations({ args, query }) {
              const res = await query(args);

              if (Array.isArray(res)) {
                const modifiedArr = [];

                res.forEach((user) => {
                  if (typeof user === 'object' && user !== null) {
                    const modifiedUser = { ...user };

                    for (const [key, value] of Object.entries(modifiedUser)) {
                      if (value instanceof Date) {
                        (modifiedUser[
                          key as keyof typeof modifiedUser
                        ] as any) = value.valueOf();
                      }
                    }

                    modifiedArr.push(modifiedUser);
                  } else {
                    modifiedArr.push(user);
                  }
                });

                return modifiedArr;
              } else if (typeof res === 'object' && res !== null) {
                const modifiedRes = { ...res };

                for (const [key, value] of Object.entries(modifiedRes)) {
                  if (value instanceof Date) {
                    (modifiedRes[key as keyof typeof modifiedRes] as any) =
                      value.valueOf();
                  }
                }

                return modifiedRes;
              } else {
                return res;
              }
            },
          },
        },
      }),
    );
  }

  public getAllUsers() {
    return this.prisma.user.findMany({
      select: this.prisma.exclude('User', ['password']),
    });
  }

  async getUser(id: string) {
    return await this.getUserEntity(id, true);
  }

  public findUserByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }

  public async createUser(dto: CreateUserDto) {
    const { login, password } = dto;
    const candidate = await this.findUserByLogin(login);

    if (candidate) {
      throw new BadRequestException(`User ${login} already exists`);
    }

    const hashedPassword = await this.hashPassword(password);

    return this.prisma.user.create({
      data: { login, password: hashedPassword, version: 1 },
      select: this.prisma.exclude('User', ['password']),
    });
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    const { oldPassword, newPassword } = dto;
    const user = await this.getUserEntity(id);

    await this.checkOldPassword(user.password, oldPassword);

    const hashedNewPassword = await this.hashPassword(newPassword);

    return this.prisma.user.update({
      where: { id },
      data: { password: hashedNewPassword, version: (user.version += 1) },
      select: this.prisma.exclude('User', ['password']),
    });
  }

  public async deleteUser(id: string) {
    await this.getUserEntity(id);
    await this.prisma.user.delete({ where: { id } });
  }

  public async updateUserRefreshToken(userId: string, refreshToken: string) {
    await this.getUserEntity(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  private async checkOldPassword(currentPassword: string, oldPassword: string) {
    const passwordMatches = await bcrypt.compare(oldPassword, currentPassword);

    if (!passwordMatches) {
      throw new ForbiddenException(`Wrong old password`);
    }
  }

  private async hashPassword(password: string) {
    const salt = Number(process.env.CRYPT_SALT);

    return await bcrypt.hash(password, salt);
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
