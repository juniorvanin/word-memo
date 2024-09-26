import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWord } from '../entities/user-word.entity';
import { Word } from 'src/words/entities/word.entity';

@Injectable()
export class UserWordsService {
  constructor(
    @InjectRepository(UserWord)
    private userWordRepository: Repository<UserWord>,
  ) {}

  public async getUserWords(userId: string): Promise<Word[]> {
    const words = await this.userWordRepository
      .createQueryBuilder('user_word')
      .innerJoinAndSelect('user_word.word', 'word')
      .where('user_word.userId = :userId', { userId })
      .getMany();

    return words.map((userWord) => userWord.word);
  }

  public async addUserWord(userId: string, wordId: string): Promise<void> {
    await this.userWordRepository.save({ userId, wordId });
  }

  public async deleteUserWord(userId: string, wordId: string): Promise<void> {
    await this.userWordRepository.delete({ userId, wordId });
  }
}
