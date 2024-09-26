import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const GeneratePromptSchema = z.object({
  choices: z
    .object({
      message: z.object({ content: z.string() }),
    })
    .array(),
});

export const GeneratePromptDto = createZodDto(GeneratePromptSchema);
