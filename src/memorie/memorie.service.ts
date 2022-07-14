import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentDto, MemorieDto } from 'src/common/dto';
import { MemorieType } from 'src/common/types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemorieService {
  constructor(private prisma: PrismaService) {}

  async getMemories() {
    return await this.prisma.memorie.findMany({
      include: {
        owner: {
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
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }

  async addMemorie(userId: string, data: MemorieDto): Promise<MemorieType> {
    return await this.prisma.memorie.create({
      data: {
        ...data,
        ownerId: userId,
      },
    });
  }

  async getMemorie(memorieId: string): Promise<MemorieType> {
    const memorie = await this.prisma.memorie.findUnique({
      where: {
        memorieId,
      },
      include: {
        owner: {
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
        },
        comments: true,
        likedBy: {
          select: {
            userId: true,
            username: true,
            profile: {
              select: {
                image: true,
              },
            },
          },
        },
      },
    });

    if (!memorie) throw new NotFoundException('Memorie not found!');
    return memorie;
  }

  async updateMemorie(
    userId: string,
    memorieId: string,
    data: MemorieDto,
  ): Promise<MemorieType> {
    const memorie = await this.checkIfMemorieExist(memorieId);

    if (memorie.ownerId !== userId)
      throw new ForbiddenException('Access denied!');

    return await this.prisma.memorie.update({
      where: {
        memorieId,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteMemorie(userId: string, memorieId: string): Promise<MemorieType> {
    const memorie = await this.checkIfMemorieExist(memorieId);

    if (memorie.ownerId !== userId)
      throw new ForbiddenException('Access denied!');

    return await this.prisma.memorie.delete({
      where: {
        memorieId,
      },
    });
  }

  async likeMemorie(userId: string, memorieId: string): Promise<MemorieType> {
    await Promise.all([
      this.checkIfMemorieExist(memorieId),
      this.checkIfUserExist(userId),
    ]);

    return await this.prisma.memorie.update({
      where: {
        memorieId,
      },
      data: {
        likedBy: {
          connect: {
            userId,
          },
        },
      },
    });
  }

  async unlikeMemorie(userId: string, memorieId: string) {
    await Promise.all([
      this.checkIfMemorieExist(memorieId),
      this.checkIfUserExist(userId),
    ]);

    return await this.prisma.memorie.update({
      where: {
        memorieId,
      },
      data: {
        likedBy: {
          disconnect: {
            userId,
          },
        },
      },
    });
  }

  async getCommentsOfMemorie(memorieId: string) {
    await this.checkIfMemorieExist(memorieId);
    return await this.prisma.comment.findMany({
      where: {
        memorieId,
      },
    });
  }

  async addComment(userId: string, memorieId: string, data: CommentDto) {
    await Promise.all([
      this.checkIfMemorieExist(memorieId),
      this.checkIfUserExist(userId),
    ]);
    const comments = await this.prisma.memorie
      .findUnique({
        where: {
          memorieId,
        },
      })
      .comments();

    if (comments.find((c) => c.authorId === userId)) {
      throw new ForbiddenException(
        'You can only have one comment per memorie!',
      );
    }
    return await this.prisma.memorie.update({
      where: {
        memorieId,
      },
      data: {
        comments: {
          create: {
            ...data,
            authorId: userId,
          },
        },
      },
    });
  }

  async deleteComment(commentId: string, memorieId: string, userId: string) {
    const comment = await this.checkIfCommentExist(commentId);

    if (comment.authorId !== userId || comment.memorieId !== memorieId) {
      throw new ForbiddenException('Access denied! ');
    }

    return await this.prisma.comment.delete({
      where: {
        commentId,
      },
    });
  }

  async checkIfMemorieExist(memorieId: string) {
    const memorie = await this.prisma.memorie.findUnique({
      where: {
        memorieId,
      },
    });

    if (!memorie) throw new NotFoundException('Memorie not found!');
    return memorie;
  }

  async checkIfUserExist(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async checkIfCommentExist(commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        commentId,
      },
    });

    if (!comment) throw new NotFoundException('Comment not found!');
    return comment;
  }
}
