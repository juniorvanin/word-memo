import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { GeneratePromptSchema } from '../dtos/generate-prompt.dto';

@Injectable()
export class OpenAIClient {
  public async ask(question: string): Promise<string> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: question }],
        response_format: { type: 'json_object' },
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const firstChoice = GeneratePromptSchema.parse(response.data).choices[0];

    if (!firstChoice) throw new Error('OpenAI returned no content.');

    return firstChoice.message.content;
  }
}
