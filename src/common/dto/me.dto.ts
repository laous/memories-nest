import { IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsOptional()
  bio: string;

  @IsOptional()
  @IsString()
  image: string;
}
