import { UserWordsService } from './user-words.service';
import { Repository } from 'typeorm';
import { UserWord } from '../entities/user-word.entity';

const getManyMock = jest.fn();

describe('UserWordsService', () => {
  let userWordsService: UserWordsService;
  let userWordRepository: jest.Mocked<Repository<UserWord>>;

  const innerJoinAndSelectMock = jest.fn();
  const whereMock = jest.fn();

  beforeEach(() => {
    userWordRepository = {
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn().mockImplementation(() => ({
        innerJoinAndSelect: innerJoinAndSelectMock.mockImplementation(() => ({
          where: whereMock.mockImplementation(() => ({
            getMany: getManyMock,
          })),
        })),
      })),
    } as unknown as jest.Mocked<Repository<UserWord>>;
    userWordsService = new UserWordsService(userWordRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user words by userId', async () => {
    const mockUserId = 'user123';
    const mockWords = [
      {
        word: {
          id: 'word1',
          word: 'Haus',
        },
      },
      {
        word: {
          id: 'word2',
          word: 'Auto',
        },
      },
    ];

    getManyMock.mockResolvedValue(mockWords);

    const result = await userWordsService.getUserWords(mockUserId);

    expect(userWordRepository.createQueryBuilder).toHaveBeenCalledWith(
      'user_word',
    );
    expect(innerJoinAndSelectMock).toHaveBeenCalledWith(
      'user_word.word',
      'word',
    );
    expect(whereMock).toHaveBeenCalledWith('user_word.userId = :userId', {
      userId: mockUserId,
    });
    expect(getManyMock).toHaveBeenCalled();
    expect(result).toEqual(mockWords.map((userWord) => userWord.word));
  });

  it('should add a user word to the repository', async () => {
    const mockUserId = 'user123';
    const mockWordId = 'word123';

    await userWordsService.addUserWord(mockUserId, mockWordId);

    expect(userWordRepository.save).toHaveBeenCalledWith({
      userId: mockUserId,
      wordId: mockWordId,
    });
  });

  it('should delete a user word from the repository', async () => {
    const mockUserId = 'user123';
    const mockWordId = 'word123';

    await userWordsService.deleteUserWord(mockUserId, mockWordId);

    expect(userWordRepository.delete).toHaveBeenCalledWith({
      userId: mockUserId,
      wordId: mockWordId,
    });
  });
});
