import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

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

  @ApiExtraModels(LoginDto)
  @Post('login')
  @ApiBody({
    schema: { $ref: getSchemaPath(LoginDto) },
    examples: {
      default: {
        summary: 'Login a user',
        value: {
          email: 'test@example.com',
          password: 'secret123',
        },
      },
    },
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
