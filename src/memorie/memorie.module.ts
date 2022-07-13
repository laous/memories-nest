import { Module } from '@nestjs/common';
import { MemorieController } from './memorie.controller';
import { MemorieService } from './memorie.service';

@Module({
  controllers: [MemorieController],
  providers: [MemorieService]
})
export class MemorieModule {}
