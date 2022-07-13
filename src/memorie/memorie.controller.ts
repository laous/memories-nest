import { Controller, Get } from '@nestjs/common';
import { MemorieService } from './memorie.service';

@Controller('memories')
export class MemorieController {
  constructor(private memorieService: MemorieService) {}

  @Get('')
  async getMemories() {
    return this.memorieService.getMemories();
  }
}
