import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetWordsResponseDto } from '../../words/dtos/get-words-response.dto';
import { UserWordsService } from '../services/user-words.service';

@Controller('/users')
export class UserWordsController {
  constructor(private readonly userWordsService: UserWordsService) {}

  @Get(':userId/words')
  async findUserWords(@Param('userId') userId): Promise<GetWordsResponseDto> {
    return await this.userWordsService.getUserWords(userId);
  }

  @Post(':userId/words/:wordId')
  async addUserWord(
    @Param('userId') userId,
    @Param('wordId') wordId,
  ): Promise<void> {
    await this.userWordsService.addUserWord(userId, wordId);
  }

  @Delete(':userId/words/:wordId')
  async deleteUserWord(
    @Param('userId') userId,
    @Param('wordId') wordId,
  ): Promise<void> {
    await this.userWordsService.deleteUserWord(userId, wordId);
  }
}
