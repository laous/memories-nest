import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(myId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: myId,
      },
      select: {
        name: true,
        email: true,
        username: true,
        profile: {
          select: {
            bio: true,
            image: true,
          },
        },
        likedMemories: true,
        memories: true,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async getMyMemories(myId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: myId,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    return await this.prisma.memorie.findMany({ where: { ownerId: myId } });
  }
}
