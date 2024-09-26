import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWordsController } from './controllers/user-words.controller';
import { UserWordsService } from './services/user-words.service';

import { UserWord } from './entities/user-word.entity';
import { WordsModule } from '../words/words.module';

@Module({
  imports: [WordsModule, TypeOrmModule.forFeature([UserWord])],
  controllers: [UserWordsController],
  providers: [UserWordsService],
})
export class UserWordsModule {}
