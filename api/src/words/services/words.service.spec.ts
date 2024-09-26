import { WordsService } from './words.service';
import { OpenAIService } from '../../openai/services/openai.service';
import { Repository } from 'typeorm';
import { Word } from '../entities/word.entity';
import { Like } from 'typeorm';
import { OpenAIClient } from 'src/openai/clients/openai.client';

jest.mock('../../openai/services/openai.service');

describe('WordsService', () => {
  let wordsService: WordsService;
  let openAIService: OpenAIService;
  let wordRepository: jest.Mocked<Repository<Word>>;
  let openAIClient: jest.Mocked<OpenAIClient>;

  beforeEach(() => {
    openAIService = new OpenAIService(openAIClient);
    wordRepository = {
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<Repository<Word>>;

    wordsService = new WordsService(openAIService, wordRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a random word and save it to the repository', async () => {
    const openAIResponse = `{
      "article": "Der",
      "word": "Honig",
      "syllables": "Ho|nig",
      "example": "Der Honig ist gelb und süß.",
      "translation": "Honey",
      "type": "noun"
    }`;
    const responseASJSON = JSON.parse(openAIResponse);

    jest.spyOn(openAIService, 'ask').mockResolvedValue(openAIResponse);

    const saveWordResponse = {
      ...responseASJSON,
      id: '1',
    } as Word;

    wordRepository.save.mockResolvedValue(saveWordResponse);

    const result = await wordsService.getRandomWord();

    expect(openAIService.ask).toHaveBeenCalledWith(
      expect.stringContaining('Give me a random word of the day in german'),
    );
    expect(wordRepository.save).toHaveBeenCalledWith(responseASJSON);

    expect(result).toEqual(saveWordResponse);
  });

  it('should save a word to the repository', async () => {
    const mockWord = new Word();
    await wordsService.saveWord(mockWord);

    expect(wordRepository.save).toHaveBeenCalledWith(mockWord);
  });

  it('should find words by term from the repository', async () => {
    const term = 'Honig';
    const expectedResponse = [new Word()];

    wordRepository.find.mockResolvedValue(expectedResponse);

    const result = await wordsService.searchWordByTerm(term);

    expect(wordRepository.find).toHaveBeenCalledWith({
      where: {
        word: Like(`%${term}%`),
      },
    });

    expect(result).toEqual(expectedResponse);
  });

  it('should delete a word by id', async () => {
    const wordId = '123';
    await wordsService.deleteWordById(wordId);

    expect(wordRepository.delete).toHaveBeenCalledWith({ id: wordId });
  });

  it('should check if a word is valid', async () => {
    const article = 'Der';
    const word = 'Eichhörnchen';
    const openAIResponse = `{
      "isValid": false,
      "article": "Das",
      "word": "Eichhörnchen"
    }`;

    const responseASJSON = JSON.parse(openAIResponse);

    jest.spyOn(openAIService, 'ask').mockResolvedValue(openAIResponse);

    const result = await wordsService.checkWord(article, word);

    expect(openAIService.ask).toHaveBeenCalledWith(
      expect.stringContaining('Check the word: "Der Eichhörnchen"'),
    );
    expect(result).toEqual(responseASJSON);
  });
});
