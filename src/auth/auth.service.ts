import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtDto, SignInDto } from './dto';
import * as bcrypt from 'bcrypt';
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

    if (!user) throw new ForbiddenException('Acess denied!');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new ForbiddenException('Acess denied!');

    const tokens = await this.generateTokens(user.userId, user.email);
    return tokens;
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
