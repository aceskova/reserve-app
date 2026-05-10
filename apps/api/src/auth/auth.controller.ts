import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import {
  LoginResponseDto,
  MeResponseDto,
  RegisterResponseDto,
} from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { AuthenticatedRequest } from './types/jwt-payload';
import type { Response } from 'express';

@ApiTags('auth')
@ApiExtraModels(
  RegisterDto,
  LoginDto,
  RegisterResponseDto,
  LoginResponseDto,
  MeResponseDto,
)
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
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    return result;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCookieAuth('accessTokenCookie')
  @ApiOkResponse({
    description: 'Returns the currently authenticated user.',
    type: MeResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid, or expired JWT access token.',
  })
  me(@Req() request: AuthenticatedRequest) {
    return this.authService.getMe(request.user.sub);
  }
}
