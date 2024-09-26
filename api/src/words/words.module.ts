import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordsController as WordsController } from './controllers/words.controller';
import { WordsService } from './services/words.service';

import { OpenAIModule } from '../openai/openai.module';

import { Word } from './entities/word.entity';

@Module({
  imports: [OpenAIModule, TypeOrmModule.forFeature([Word])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
