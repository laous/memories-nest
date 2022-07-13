import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class MemorieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsArray()
  hashtags: string[];
}
