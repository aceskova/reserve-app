import { ApiProperty } from '@nestjs/swagger';
import {
  AUTH_EMAIL_MAX_LENGTH,
  AUTH_PASSWORD_MAX_LENGTH,
} from '@repo/api-contracts';
import { MaxLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ example: 'test@example.com' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(AUTH_EMAIL_MAX_LENGTH)
  email!: string;

  @ApiProperty({ example: 'secret123' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(AUTH_PASSWORD_MAX_LENGTH)
  password!: string;
}
