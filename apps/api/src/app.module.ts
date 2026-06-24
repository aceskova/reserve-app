import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TrainingSessionsModule } from './training-sessions/training-sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env', '../../packages/db/.env'],
    }),
    AuthModule,
    TrainingSessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
