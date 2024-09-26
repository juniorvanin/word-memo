import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Word } from '../entities/word.entity';

describe('WordsController (e2e)', () => {
  let app: INestApplication;
  let wordsRepository: Repository<Word>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Inject AppModule here
    }).compile();

    app = moduleFixture.createNestApplication();
    wordsRepository = moduleFixture.get<Repository<Word>>(
      getRepositoryToken(Word),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /words', () => {
    it('should search words by term', async () => {
      const word = await wordsRepository.save({
        article: 'Das',
        word: 'Test Handy',
        syllables: 'Han-dy',
        example: 'Das Handy ist kaputt.',
        translation: 'Phone',
        type: 'noun',
      });

      const anotherWord = await wordsRepository.save({
        article: 'Das',
        word: 'Test Buch',
        syllables: 'Buch',
        example: 'Das Buch ist interessant.',
        translation: 'Book',
        type: 'noun',
      });

      const notFoundWord = await wordsRepository.save({
        article: 'Das',
        word: 'Not Found Auto',
        syllables: 'Au-to',
        example: 'Das Auto ist schnell.',
        translation: 'Car',
        type: 'noun',
      });

      await request(app.getHttpServer())
        .get('/words?term=Test')
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              {
                id: word.id,
                article: 'Das',
                word: 'Test Handy',
                syllables: 'Han-dy',
                example: 'Das Handy ist kaputt.',
                translation: 'Phone',
                type: 'noun',
              },
              {
                id: anotherWord.id,
                article: 'Das',
                word: 'Test Buch',
                syllables: 'Buch',
                example: 'Das Buch ist interessant.',
                translation: 'Book',
                type: 'noun',
              },
            ]),
          );
          expect(response.body).toEqual(
            expect.not.arrayContaining([
              {
                id: notFoundWord.id,
                article: 'Das',
                word: 'Not Found Auto',
                syllables: 'Au-to',
                example: 'Das Auto ist schnell.',
                translation: 'Car',
                type: 'noun',
              },
            ]),
          );
        });

      await wordsRepository.delete(word.id);
      await wordsRepository.delete(anotherWord.id);
      await wordsRepository.delete(notFoundWord.id);
    });
  });

  describe('GET /words/random', () => {
    it('should generate and save random word', async () => {
      const word = await request(app.getHttpServer())
        .get('/words/random')
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({
            id: expect.any(String),
            article: expect.any(String),
            word: expect.any(String),
            syllables: expect.any(String),
            example: expect.any(String),
            translation: expect.any(String),
            type: expect.any(String),
          });
        });

      await wordsRepository.delete(word.body.id);
    });
  });

  describe('GET /words/check', () => {
    it('should return isValid as false and the correct word', async () => {
      await request(app.getHttpServer())
        .post('/words/check')
        .send({ article: 'Die', word: 'Hund' })
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({
            isValid: false,
            article: 'Der',
            word: 'Hund',
          });
        });
    });
    it('should return isValid as true when word is correct', async () => {
      await request(app.getHttpServer())
        .post('/words/check')
        .send({ article: 'Der', word: 'Apfel' })
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({
            isValid: true,
            article: 'Der',
            word: 'Apfel',
          });
        });
    });
  });
});
