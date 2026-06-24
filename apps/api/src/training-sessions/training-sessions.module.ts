import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrainingSessionsController } from './training-sessions.controller';
import { TrainingSessionsService } from './training-sessions.service';

@Module({
  imports: [PrismaModule],
  controllers: [TrainingSessionsController],
  providers: [TrainingSessionsService],
})
export class TrainingSessionsModule {}
