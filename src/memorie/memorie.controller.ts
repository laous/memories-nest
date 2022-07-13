import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { MemorieDto } from 'src/common/dto';
import { ATGuard } from 'src/common/guards';
import { MemorieService } from './memorie.service';

@Controller('memories')
export class MemorieController {
  constructor(private memorieService: MemorieService) {}

  @Get('')
  async getMemories() {
    return this.memorieService.getMemories();
  }

  @Post('')
  @UseGuards(ATGuard)
  @UsePipes(new ValidationPipe())
  async addMemorie(
    @GetCurrentUser('userId') userId: string,
    @Body() memorie: MemorieDto,
  ) {
    return this.memorieService.addMemorie(userId, memorie);
  }

  @Get(':memorieId')
  async getMemorie() {}

  @Put(':memorieId')
  async updateMemorie() {}

  @Post(':memorieId/like')
  async likeMemorie() {}

  @Delete(':memorieId/like')
  async unlikeMemorie() {}
}
