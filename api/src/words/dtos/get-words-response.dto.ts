import { createZodDto } from '@anatine/zod-nestjs';

import { GetSingleWordResponseSchema } from './get-single-word-response.dto';

export const GetWordsResponse = GetSingleWordResponseSchema.array();
export class GetWordsResponseDto extends createZodDto(GetWordsResponse) {}
