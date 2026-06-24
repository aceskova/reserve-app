import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
import {
  TRAINING_SESSION_CURRENCY_LENGTH,
  TRAINING_SESSION_DESCRIPTION_MAX_LENGTH,
  TRAINING_SESSION_TITLE_MAX_LENGTH,
  type CreateTrainingSessionRequestDto as CreateTrainingSessionRequestContract,
} from '@repo/api-contracts';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateTrainingSessionRequestDto implements CreateTrainingSessionRequestContract {
  @ApiProperty({ example: 'Joga' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(TRAINING_SESSION_TITLE_MAX_LENGTH)
  title!: string;

  @ApiPropertyOptional({ example: 'Joga description' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsOptional()
  @IsString()
  @MaxLength(TRAINING_SESSION_DESCRIPTION_MAX_LENGTH)
  description?: string;

  @ApiProperty({ example: '2026-12-31T23:59:59Z' })
  @IsISO8601()
  startsAtUtc!: string;

  @ApiProperty({ example: '2026-12-31T23:59:59Z' })
  @IsISO8601()
  endsAtUtc!: string;

  @ApiProperty({ example: 12 })
  @IsInt()
  @Min(1)
  capacity!: number;

  @ApiProperty({ example: 25000 })
  @IsInt()
  @Min(0)
  priceCents!: number;

  @ApiProperty({ example: 'CZK' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @Length(TRAINING_SESSION_CURRENCY_LENGTH, TRAINING_SESSION_CURRENCY_LENGTH)
  currency!: string;
}

//todo add custom validation to ensure that endsAtUtc is after startsAtUtc
