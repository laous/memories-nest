import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { ProfileDto } from 'src/common/dto';
import { ATGuard } from 'src/common/guards';
import { UserService } from './user.service';

@Controller('me')
export class MeController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(ATGuard)
  async getMe(@GetCurrentUser('userId') myId: string) {
    return await this.userService.getMe(myId);
  }

  @Get('memories')
  @UseGuards(ATGuard)
  async getMyMemories(@GetCurrentUser('userId') myId: string) {
    return await this.userService.getMyMemories(myId);
  }

  @Put('profile')
  @UseGuards(ATGuard)
  async updateProfile(
    @GetCurrentUser('userId') myId: string,
    @Body() data: ProfileDto,
  ) {
    return await this.userService.updateMyProfile(myId, data);
  }

  @Get('followers')
  @UseGuards(ATGuard)
  async getMyFollowers(@GetCurrentUser('userId') myId: string) {
    return await this.userService.getMyFollowers(myId);
  }

  @Delete('followers/:userId')
  @UseGuards(ATGuard)
  async removeFollower(
    @GetCurrentUser('userId') myId: string,
    @Param('userId') userId: string,
  ) {
    return await this.userService.removeFollower(myId, userId);
  }

  @Get('following')
  @UseGuards(ATGuard)
  async getMyFollowing(@GetCurrentUser('userId') myId: string) {
    return await this.userService.getMyFollowing(myId);
  }

  @Post('following/:userId')
  @UseGuards(ATGuard)
  async follow(
    @GetCurrentUser('userId') myId: string,
    @Param('userId') userId: string,
  ) {
    return await this.userService.follow(myId, userId);
  }

  @Delete('following/:userId')
  @UseGuards(ATGuard)
  async unfollow(
    @GetCurrentUser('userId') myId: string,
    @Param('userId') userId: string,
  ) {
    return await this.userService.unfollow(myId, userId);
  }
}
