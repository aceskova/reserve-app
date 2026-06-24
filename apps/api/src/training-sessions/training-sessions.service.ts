import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Role, type TrainingSession, type User } from '@repo/db';
import type {
  CreateTrainingSessionRequestDto,
  CreateTrainingSessionResponseDto,
  TrainingSessionDto,
} from '@repo/api-contracts';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtPayload } from '../auth/types/jwt-payload';
import { ListTrainingSessionsResponseDto } from './dto/training-session-response.dto';

type TrainingSessionWithTrainer = TrainingSession & {
  trainer: Pick<User, 'id' | 'name'>;
};

@Injectable()
export class TrainingSessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTrainingSession(
    dto: CreateTrainingSessionRequestDto,
    currentUser: JwtPayload,
  ): Promise<CreateTrainingSessionResponseDto> {
    if (currentUser.role !== Role.TRAINER && currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Only trainers and admins can create training sessions',
      );
    }

    const startsAtUtc = new Date(dto.startsAtUtc);
    const endsAtUtc = new Date(dto.endsAtUtc);

    if (endsAtUtc <= startsAtUtc) {
      throw new UnprocessableEntityException(
        'Training session must end after it starts',
      );
    }

    const trainingSession = await this.prisma.trainingSession.create({
      data: {
        title: dto.title,
        description: dto.description,
        trainerId: currentUser.sub,
        startsAtUtc,
        endsAtUtc,
        capacity: dto.capacity,
        priceCents: dto.priceCents,
        currency: dto.currency,
      },
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      trainingSession: this.toTrainingSessionDto(trainingSession),
    };
  }

  private toTrainingSessionDto(
    trainingSession: TrainingSessionWithTrainer,
  ): TrainingSessionDto {
    return {
      id: trainingSession.id,
      title: trainingSession.title,
      description: trainingSession.description,
      trainer: {
        id: trainingSession.trainer.id,
        name: trainingSession.trainer.name,
      },
      startsAtUtc: trainingSession.startsAtUtc.toISOString(),
      endsAtUtc: trainingSession.endsAtUtc.toISOString(),
      capacity: trainingSession.capacity,
      priceCents: trainingSession.priceCents,
      currency: trainingSession.currency,
      createdAt: trainingSession.createdAt.toISOString(),
      updatedAt: trainingSession.updatedAt.toISOString(),
    };
  }

  async findAll(): Promise<ListTrainingSessionsResponseDto> {
    const trainingSessions = await this.prisma.trainingSession.findMany({
      orderBy: {
        startsAtUtc: 'asc',
      },
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      trainingSessions: trainingSessions.map((session) =>
        this.toTrainingSessionDto(session),
      ),
    };
  }

  async findOne(id: string): Promise<CreateTrainingSessionResponseDto> {
    const trainingSession = await this.prisma.trainingSession.findUnique({
      where: { id },
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!trainingSession) {
      throw new NotFoundException('Training session not found');
    }

    return {
      trainingSession: this.toTrainingSessionDto(trainingSession),
    };
  }
}
