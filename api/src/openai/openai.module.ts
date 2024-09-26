import { Module } from '@nestjs/common';

import { OpenAIClient } from './clients/openai.client';
import { OpenAIService } from './services/openai.service';

@Module({
  providers: [OpenAIClient, OpenAIService],
  imports: [],
  exports: [OpenAIService],
})
export class OpenAIModule {}
