import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { ATGuard } from 'src/common/guards';
import { UserService } from './user.service';

@Controller('me')
export class MeController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(ATGuard)
  async getMe(@GetCurrentUser('userId') myId: string) {}

  @Get('memories')
  @UseGuards(ATGuard)
  async getMyMemories() {}

  @Get('followers')
  @UseGuards(ATGuard)
  async getMyFollowers() {}

  @Get('following')
  @UseGuards(ATGuard)
  async getMyFollowing() {}

  @Post('following/:userId')
  @UseGuards(ATGuard)
  async follow() {}

  @Delete('following/:userId')
  @UseGuards(ATGuard)
  async unfollow() {}

  @Put('profile')
  @UseGuards(ATGuard)
  async updateProfile() {}
}
