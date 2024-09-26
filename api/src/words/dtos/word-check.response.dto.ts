import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const WordCheckResponseSchema = z.object({
  isValid: z.boolean(),
  article: z.string(),
  word: z.string(),
});

export class WordCheckResponseDto extends createZodDto(
  WordCheckResponseSchema,
) {}
