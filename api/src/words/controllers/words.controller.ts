import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { WordsService } from '../services/words.service';
import { GetSingleWordResponseDto } from '../dtos/get-single-word-response.dto';
import { WordCheckResponseDto } from '../dtos/word-check.response.dto';
import { GetWordsResponseDto } from '../dtos/get-words-response.dto';

@Controller('/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async findWordsByText(@Query('term') term): Promise<GetWordsResponseDto> {
    return await this.wordsService.searchWordByTerm(term);
  }

  @Delete('/:wordId')
  async deleteWord(@Param('wordId') wordId) {
    return await this.wordsService.deleteWordById(wordId);
  }

  @Get('/random')
  async getRandomWord(): Promise<GetSingleWordResponseDto> {
    return await this.wordsService.getRandomWord();
  }

  @Post('/check')
  async checkWord(
    @Body() { article, word }: { article: string; word: string },
  ): Promise<WordCheckResponseDto> {
    return this.wordsService.checkWord(article, word);
  }
}
