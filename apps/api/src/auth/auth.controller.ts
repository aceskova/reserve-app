import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto, RegisterResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@ApiExtraModels(RegisterDto, LoginDto, RegisterResponseDto, LoginResponseDto)
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
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    type: RegisterResponseDto,
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

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
  @ApiOkResponse({
    description: 'User authenticated successfully. Returns a JWT access token.',
    type: LoginResponseDto,
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
