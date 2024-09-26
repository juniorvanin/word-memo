import { Injectable } from '@nestjs/common';
import { OpenAIClient } from '../clients/openai.client';

@Injectable()
export class OpenAIService {
  constructor(private client: OpenAIClient) {}

  public async ask(question: string): Promise<string> {
    return this.client.ask(question);
  }
}
