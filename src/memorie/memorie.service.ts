import { Injectable, NotFoundException } from '@nestjs/common';
import { MemorieDto } from 'src/common/dto';
import { MemorieType } from 'src/common/types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemorieService {
  constructor(private prisma: PrismaService) {}

  async getMemories() {
    return await this.prisma.memorie.findMany();
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
    });

    if (!memorie) throw new NotFoundException('Memorie not found!');

    return memorie;
  }
}
