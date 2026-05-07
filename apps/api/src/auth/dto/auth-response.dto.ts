import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'test@example.com' })
  email!: string;

  @ApiProperty({ example: 'Test User' })
  name!: string;

  @ApiProperty({ example: 'USER' })
  role!: string;

  @ApiProperty({ example: '2026-05-07T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-05-07T10:00:00.000Z' })
  updatedAt!: Date;
}

export class RegisterResponseDto {
  @ApiProperty({ type: PublicUserDto })
  user!: PublicUserDto;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.signature',
  })
  accessToken!: string;

  @ApiProperty({ type: PublicUserDto })
  user!: PublicUserDto;
}
