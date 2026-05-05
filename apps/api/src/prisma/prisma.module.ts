import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // aby PrismaService byla dostupná všude bez importů
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
