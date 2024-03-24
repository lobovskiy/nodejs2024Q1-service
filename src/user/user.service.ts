import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.model';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  public getAllUsers() {
    return this.users;
  }

  public getUser(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  public createUser(dto: CreateUserDto) {
    const user = new UserEntity(dto);

    this.users.push(user);

    return user;
  }

  public updateUser(id: string, dto: UpdateUserDto) {
    const user = this.getUser(id);

    this.checkOldPassword(user, dto.oldPassword);
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();

    return user;
  }

  public deleteUser(id: string) {
    const deletingUser = this.getUser(id);

    this.users = this.users.filter((user) => user.id !== deletingUser.id);
  }

  private checkOldPassword(user: UserEntity, oldPassword: string) {
    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Wrong old password`);
    }
  }
}
