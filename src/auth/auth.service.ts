import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtDto, RegisterDto, SignInDto } from './dto';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(data: SignInDto): Promise<JwtDto> {
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

  async register(data: RegisterDto): Promise<JwtDto> {
    const password = await this.hashPassword(data.password);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password,
        username: data.username,
      },
    });

    if (!user) throw new ForbiddenException('Acess denied!');

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

  async generateTokens(userId: string, email: string): Promise<JwtDto> {
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
