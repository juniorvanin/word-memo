import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const OpenAIRandomWordResponseSchema = z.object({
  article: z.string(),
  word: z.string(),
  syllables: z.string(),
  example: z.string(),
  translation: z.string(),
  type: z.string(),
});

export class OpenAIRandomWordResponseDto extends createZodDto(
  OpenAIRandomWordResponseSchema,
) {}
