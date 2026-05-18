import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  AUTH_EMAIL_MAX_LENGTH,
  AUTH_NAME_MAX_LENGTH,
  AUTH_NAME_MIN_LENGTH,
  AUTH_PASSWORD_MAX_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
} from '@repo/api-contracts';
import { Transform } from 'class-transformer';

export class RegisterDto {
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
  @MinLength(AUTH_PASSWORD_MIN_LENGTH)
  @MaxLength(AUTH_PASSWORD_MAX_LENGTH)
  password!: string;

  @ApiProperty({ example: 'Test User' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MinLength(AUTH_NAME_MIN_LENGTH)
  @MaxLength(AUTH_NAME_MAX_LENGTH)
  name!: string;
}
