import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('auth')
@ApiExtraModels(RegisterDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    schema: { $ref: getSchemaPath(RegisterDto) },
    examples: {
      default: {
        summary: 'Register a user',
        value: {
          email: 'test@example.com',
          password: 'secret123',
          name: 'Test User',
        },
      },
    },
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
