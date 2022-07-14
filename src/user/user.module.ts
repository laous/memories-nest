import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MeController } from './me.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController, MeController],
})
export class UserModule {}
