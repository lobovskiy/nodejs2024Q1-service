import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signup(authDto: AuthDto) {
    return await this.userService.createUser(authDto);
  }

  public async login(authDto: AuthDto) {
    const { login, password } = authDto;
    const user = await this.userService.findUserByLogin(login);

    if (!user) {
      throw new BadRequestException(`User ${login} doesn't exists`);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException(`Password for user ${login} is incorrect`);
    }

    return await this.getUserTokens(user.id, login);
  }

  public async refresh(refreshToken: string) {
    const { userId } = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    const user = await this.userService.getUser(userId);
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }

    return await this.getUserTokens(user.id, user.login);
  }

  private async getUserTokens(userId: string, login: string) {
    const tokens = await this.getTokens(userId, login);
    const refreshTokenHashed = await argon2.hash(tokens.refreshToken);

    await this.userService.updateUserRefreshToken(userId, refreshTokenHashed);

    return tokens;
  }

  private async getTokens(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
