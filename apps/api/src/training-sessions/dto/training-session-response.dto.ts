import { ApiProperty } from '@nestjs/swagger';

class TrainingSessionTrainerDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'Test Trainer' })
  name!: string;
}

export class TrainingSessionResponseItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'Joga' })
  title!: string;

  @ApiProperty({
    example: 'Joga description',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({ type: TrainingSessionTrainerDto })
  trainer!: TrainingSessionTrainerDto;

  @ApiProperty({ example: '2026-12-31T17:00:00.000Z' })
  startsAtUtc!: string;

  @ApiProperty({ example: '2026-12-31T18:00:00.000Z' })
  endsAtUtc!: string;

  @ApiProperty({ example: 12 })
  capacity!: number;

  @ApiProperty({ example: 25000 })
  priceCents!: number;

  @ApiProperty({ example: 'CZK' })
  currency!: string;

  @ApiProperty({ example: '2026-06-18T10:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-06-18T10:00:00.000Z' })
  updatedAt!: string;
}

export class CreateTrainingSessionResponseDto {
  @ApiProperty({ type: TrainingSessionResponseItemDto })
  trainingSession!: TrainingSessionResponseItemDto;
}

export class ListTrainingSessionsResponseDto {
  @ApiProperty({ type: TrainingSessionResponseItemDto, isArray: true })
  trainingSessions!: TrainingSessionResponseItemDto[];
}
