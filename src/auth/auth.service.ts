import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtDto, SignInDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(data: SignInDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new ForbiddenException('Acess denied!');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new ForbiddenException('Acess denied!');
    return user;
  }

  async hashPassword(pw: string): Promise<string> {
    return await bcrypt.hash(pw, 10);
  }
}
