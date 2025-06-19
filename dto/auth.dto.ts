import { IsString, IsNotEmpty, MinLength, MaxLength,IsEmail } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
   @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  email:string

   @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  phoneNumber: string;

}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
} 