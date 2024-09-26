import { Module } from '@nestjs/common';

import { OpenAIModule } from './openai/openai.module';
import { WordsModule } from './words/words.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { UserWordsModule } from './user-words/user-words.module';

@Module({
  imports: [
    OpenAIModule,
    UserWordsModule,
    WordsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
