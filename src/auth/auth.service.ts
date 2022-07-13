import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto, SignInDto } from '../common/dto';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtType, UserType } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(data: SignInDto): Promise<JwtType> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new ForbiddenException('Access denied!');

    const tokens = await this.generateTokens(user.userId, user.email);
    await this.updateHashedRefreshToken(user.userId, tokens.refresh_token);
    return tokens;
  }

  async register(data: RegisterDto): Promise<JwtType> {
    const password = await this.hashPassword(data.password);
    let user: UserType = null;
    try {
      user = await this.prisma.user.create({
        data: {
          email: data.email,
          password,
          username: data.username,
          profile: {
            create: {
              bio: '',
              image: '',
            },
          },
        },
      });
    } catch (err) {
      throw new ForbiddenException('Access denied!');
    }

    if (!user) throw new ForbiddenException('Access denied!');

    const tokens = await this.generateTokens(user.userId, user.email);
    await this.updateHashedRefreshToken(user.userId, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    return await this.prisma.user.updateMany({
      where: {
        userId,
        hashedRT: {
          not: null,
        },
      },
      data: {
        hashedRT: null,
      },
    });
  }

  async refreshTokens(userId: string, rt: string): Promise<JwtType> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });
    if (!user || !user.hashedRT)
      throw new ForbiddenException('Access denied!!');

    const isMatch = await argon2.verify(user.hashedRT, rt);

    if (!isMatch) throw new ForbiddenException('Access denied!');

    const tokens = await this.generateTokens(user.userId, user.email);

    await this.updateHashedRefreshToken(user.userId, tokens.refresh_token);
    return tokens;
  }

  async updateHashedRefreshToken(id: string, rt: string) {
    const hashedRT = await argon2.hash(rt);
    await this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        hashedRT,
      },
    });
  }

  async hashPassword(pw: string): Promise<string> {
    return await bcrypt.hash(pw, 10);
  }

  async generateTokens(userId: string, email: string): Promise<JwtType> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 15,
          secret: 'at-secret',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24,
          secret: 'rt-secret',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
