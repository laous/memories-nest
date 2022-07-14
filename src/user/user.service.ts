import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { use } from 'passport';
import { ProfileDto } from 'src/common/dto';
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
        userId: true,
        email: true,
        username: true,
        profile: {
          select: {
            bio: true,
            image: true,
            name: true,
          },
        },
        likedMemories: true,
        memories: true,
        followers: true,
        following: true,
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

  async updateMyProfile(myId: string, data: ProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: myId,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    return await this.prisma.profile.upsert({
      where: {
        userId: myId,
      },
      create: {
        ...data,
        userId: myId,
      },
      update: {
        ...data,
      },
    });
  }

  async getMyFollowers(myId: string) {
    await this.checkIfUserExists(myId);

    return await this.prisma.user
      .findUnique({
        where: {
          userId: myId,
        },
      })
      .followers({
        select: {
          userId: true,
          email: true,
          username: true,
          profile: {
            select: {
              image: true,
              bio: true,
              name: true,
            },
          },
        },
      });
  }

  async getMyFollowing(myId: string) {
    await this.checkIfUserExists(myId);

    return await this.prisma.user
      .findUnique({
        where: {
          userId: myId,
        },
      })
      .following({
        select: {
          userId: true,
          email: true,
          username: true,
          profile: {
            select: {
              image: true,
              bio: true,
              name: true,
            },
          },
        },
      });
  }

  async follow(myId: string, userId: string) {
    const [a, b] = await Promise.all([
      await this.checkIfUserExists(myId),
      await this.checkIfUserExists(userId),
    ]);
    if (myId === userId) {
      throw new ForbiddenException("You can't follow yourself");
    }
    return await this.prisma.user.update({
      where: {
        userId: myId,
      },
      data: {
        following: {
          connect: {
            userId,
          },
        },
      },
      select: {
        userId: true,
        email: true,
        username: true,
        profile: {
          select: {
            image: true,
            bio: true,
            name: true,
          },
        },
      },
    });
  }

  async unfollow(myId: string, userId: string) {
    const [a, b] = await Promise.all([
      await this.checkIfUserExists(myId),
      await this.checkIfUserExists(userId),
    ]);
    if (myId === userId) {
      throw new ForbiddenException('Denied');
    }
    return await this.prisma.user.update({
      where: {
        userId: myId,
      },
      data: {
        following: {
          disconnect: {
            userId,
          },
        },
      },
      select: {
        userId: true,
        email: true,
        username: true,
        profile: {
          select: {
            image: true,
            bio: true,
            name: true,
          },
        },
      },
    });
  }

  async checkIfUserExists(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { userId } });

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
