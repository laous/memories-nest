import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemorieService {
  constructor(private prisma: PrismaService) {}

  async getMemories() {
    return await this.prisma.memorie.findMany();
  }
}
