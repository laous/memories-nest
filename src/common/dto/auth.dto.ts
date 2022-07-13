import { IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class JwtDto {
  @IsJWT()
  @IsNotEmpty()
  access_token: string;

  @IsJWT()
  @IsNotEmpty()
  refresh_token: string;
}
