import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const GetSingleWordResponseSchema = z.object({
  id: z.string(),
  article: z.string(),
  word: z.string(),
  syllables: z.string(),
  example: z.string(),
  translation: z.string(),
  type: z.string(),
});

export class GetSingleWordResponseDto extends createZodDto(
  GetSingleWordResponseSchema,
) {}
