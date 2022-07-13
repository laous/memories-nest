import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MemorieController } from './memorie.controller';
import { MemorieService } from './memorie.service';

@Module({
  controllers: [MemorieController],
  providers: [MemorieService, PrismaService],
})
export class MemorieModule {}
