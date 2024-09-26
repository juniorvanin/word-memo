import { OpenAIClient } from './openai.client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpenAIClient', () => {
  let client: OpenAIClient;

  beforeEach(() => {
    client = new OpenAIClient();
    jest.clearAllMocks();
  });

  it('should return the correct response when API call is successful', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: 'Mocked response from OpenAI',
            },
          },
        ],
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const question = 'What is the weather like?';
    const result = await client.ask(question);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: question }],
        response_format: { type: 'json_object' },
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    expect(result).toBe('Mocked response from OpenAI');
  });

  it('should throw an error if OpenAI returns no choices', async () => {
    const mockResponse = {
      data: {
        choices: [],
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    await expect(client.ask('Some question')).rejects.toThrow(
      'OpenAI returned no content.',
    );
  });

  it('should throw an error if axios call fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    await expect(client.ask('Some question')).rejects.toThrow('Network error');
  });
});
