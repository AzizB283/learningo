import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { Translation } from './entities/translation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Translation])],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
