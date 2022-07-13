import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { CommentDto, MemorieDto } from 'src/common/dto';
import { ATGuard } from 'src/common/guards';
import { MemorieService } from './memorie.service';

@Controller('memories')
export class MemorieController {
  constructor(private memorieService: MemorieService) {}

  @Get('')
  async getMemories() {
    return await this.memorieService.getMemories();
  }

  @Post('')
  @UseGuards(ATGuard)
  @UsePipes(new ValidationPipe())
  async addMemorie(
    @GetCurrentUser('userId') userId: string,
    @Body() memorie: MemorieDto,
  ) {
    return await this.memorieService.addMemorie(userId, memorie);
  }

  @Get(':memorieId')
  async getMemorie(@Param('memorieId') memorieId: string) {
    return await this.memorieService.getMemorie(memorieId);
  }

  @Put(':memorieId')
  @UseGuards(ATGuard)
  @UsePipes(new ValidationPipe())
  async updateMemorie(
    @GetCurrentUser('userId') userId: string,
    @Param('memorieId') memorieId: string,
    @Body() memorie: MemorieDto,
  ) {
    return await this.memorieService.updateMemorie(userId, memorieId, memorie);
  }

  @Post(':memorieId/like')
  @UseGuards(ATGuard)
  async likeMemorie(
    @GetCurrentUser('userId') userId: string,
    @Param('memorieId') memorieId: string,
  ) {
    return await this.memorieService.likeMemorie(userId, memorieId);
  }

  @Delete(':memorieId/like')
  @UseGuards(ATGuard)
  async unlikeMemorie(
    @GetCurrentUser('userId') userId: string,
    @Param('memorieId') memorieId: string,
  ) {
    return await this.memorieService.unlikeMemorie(userId, memorieId);
  }

  @Get(':memorieId/comments')
  async getCommentsOfMemorie(@Param('memorieId') memorieId: string) {
    return await this.memorieService.getCommentsOfMemorie(memorieId);
  }

  @Post(':memorieId/comments')
  @UseGuards(ATGuard)
  async addComment(
    @GetCurrentUser('userId') userId: string,
    @Param('memorieId') memorieId: string,
    @Body() comment: CommentDto,
  ) {
    return await this.memorieService.addComment(userId, memorieId, comment);
  }
}
