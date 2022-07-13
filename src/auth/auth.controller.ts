import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { ATGuard, RTGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { RegisterDto, SignInDto } from '../common/dto';
import { JwtType } from 'src/common/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('signin')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() user: SignInDto): Promise<JwtType> {
    return await this.authService.signIn(user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: RegisterDto): Promise<JwtType> {
    return await this.authService.register(user);
  }

  @Post('logout')
  @UseGuards(ATGuard)
  @HttpCode(HttpStatus.OK)
  // we can get only the sub field from decorator
  async logout(@GetCurrentUser('userId') userId: string) {
    await this.authService.logout(userId);
    return {
      message: 'Logged out!',
    };
  }

  @Post('refresh')
  @UseGuards(RTGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@GetCurrentUser() user): Promise<JwtType> {
    return await this.authService.refreshTokens(
      user['userId'],
      user['refreshToken'],
    );
  }
}
