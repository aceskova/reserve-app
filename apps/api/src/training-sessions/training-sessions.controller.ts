import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/types/jwt-payload';
import { CreateTrainingSessionRequestDto } from './dto/create-training-session.dto';
import { TrainingSessionsService } from './training-sessions.service';
import {
  CreateTrainingSessionResponseDto,
  ListTrainingSessionsResponseDto,
} from './dto/training-session-response.dto';

@ApiTags('training-sessions')
@ApiExtraModels(CreateTrainingSessionRequestDto)
@Controller('training-sessions')
export class TrainingSessionsController {
  constructor(
    private readonly trainingSessionsService: TrainingSessionsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCookieAuth('accessTokenCookie')
  @ApiBody({
    schema: { $ref: getSchemaPath(CreateTrainingSessionRequestDto) },
    examples: {
      default: {
        summary: 'Create a training session',
        value: {
          title: 'Joga',
          description: 'Joga description',
          startsAtUtc: '2026-12-31T17:00:00.000Z',
          endsAtUtc: '2026-12-31T18:00:00.000Z',
          capacity: 12,
          priceCents: 25000,
          currency: 'CZK',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Training session created successfully.',
    type: CreateTrainingSessionResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid, or expired JWT access token.',
  })
  @ApiForbiddenResponse({
    description: 'Only trainers and admins can create training sessions.',
  })
  createTrainingSession(
    @Body() dto: CreateTrainingSessionRequestDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.trainingSessionsService.createTrainingSession(
      dto,
      request.user,
    );
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns all training sessions.',
    type: ListTrainingSessionsResponseDto,
  })
  findAll() {
    return this.trainingSessionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns a specific training session.',
    type: CreateTrainingSessionResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.trainingSessionsService.findOne(id);
  }
}
