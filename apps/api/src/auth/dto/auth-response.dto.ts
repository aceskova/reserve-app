import { ApiProperty } from '@nestjs/swagger';
import type {
  LoginResponseDto as LoginResponseContract,
  MeResponseDto as MeResponseContract,
  PublicUserDto as PublicUserContract,
  RegisterResponseDto as RegisterResponseContract,
} from '@repo/api-contracts';

export class PublicUserDto implements PublicUserContract {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'test@example.com' })
  email!: string;

  @ApiProperty({ example: 'Test User' })
  name!: string;

  @ApiProperty({ example: 'USER' })
  role!: 'USER' | 'TRAINER' | 'ADMIN';

  @ApiProperty({ example: '2026-05-07T10:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-05-07T10:00:00.000Z' })
  updatedAt!: string;
}

export class RegisterResponseDto implements RegisterResponseContract {
  @ApiProperty({ type: PublicUserDto })
  user!: PublicUserDto;
}

export class MeResponseDto implements MeResponseContract {
  @ApiProperty({ type: PublicUserDto })
  user!: PublicUserDto;
}

export class LoginResponseDto implements LoginResponseContract {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.signature',
  })
  accessToken!: string;

  @ApiProperty({ type: PublicUserDto })
  user!: PublicUserDto;
}
