import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../../openai/services/openai.service';
import { GetSingleWordResponseDto } from '../dtos/get-single-word-response.dto';
import { OpenAIRandomWordResponseDto } from '../dtos/open-ai-random-word-response.dto';
import { WordCheckResponseDto } from '../dtos/word-check.response.dto';
import { Word } from '../entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { GetWordsResponseDto } from '../dtos/get-words-response.dto';

@Injectable()
export class WordsService {
  constructor(
    private readonly openAIService: OpenAIService,
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async getRandomWord(): Promise<GetSingleWordResponseDto> {
    const chatGptPrompt = `Give me a random word of the day in german. You should also return the word separated by its syllables and the type of word, if it is a verb, an adjective, a noun and so on. The example should be a sentence in german with this word in it.  Reply using a JSON response as in the following format: { article: 'Der', word: 'Honig', syllables: "Ho|nig", example: 'Der Honig ist gelb und süß.', translation: 'Honey', type: 'adjective' }.`;

    const randomWord = OpenAIRandomWordResponseDto.create(
      JSON.parse(await this.openAIService.ask(chatGptPrompt)),
    );

    return await this.wordRepository.save(randomWord);
  }

  async saveWord(word: Word): Promise<void> {
    await this.wordRepository.save(word);
  }

  async searchWordByTerm(term: string): Promise<GetWordsResponseDto> {
    return await this.wordRepository.find({
      where: {
        word: Like(`%${term}%`),
      },
    });
  }

  async deleteWordById(id: string) {
    await this.wordRepository.delete({ id });
  }

  async checkWord(
    article: string,
    word: string,
  ): Promise<WordCheckResponseDto> {
    const chatGptPrompt = `Determine if a German word is valid and its article is correct. For example, the phrase "Der Eichhörnchen" is incorrect because the word "Eichhörnchen" is neuter and not masculine. If there are a few grammatical mistakes, return the correct version. If you are uncertain and cannot suggest a correct version, return isValid as false. Respond with a JSON response in the following format: { isValid: boolean, article: string | undefined, word: string | undefined }. Check the word: "${article} ${word}".`;

    const result = await this.openAIService.ask(chatGptPrompt);

    return WordCheckResponseDto.create(JSON.parse(result));
  }
}
