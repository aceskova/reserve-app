import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'test@example.com' })
  email!: string;

  @ApiProperty({ example: 'secret123' })
  password!: string;

  @ApiProperty({ example: 'Test User' })
  name!: string;
}
