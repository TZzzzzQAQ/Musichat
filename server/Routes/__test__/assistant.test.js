import request from 'supertest';
import express from 'express';
import musicRoutes from '../assistant.route';  // Adjust the path to where your musicRoutes is actually located.
import {OpenAI} from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const app = express();


app.use(express.json());
app.use('/music', musicRoutes);

describe('POST /music', () => {
  afterEach(() => {
    jest.clearAllMocks();  // Resets mocks so that mock data does not leak between tests
  });

  // Updated test to match received data format
  it('should handle valid input correctly and return messages', async () => {
    const response = await request(app)
      .post('/music')
      .send({ userInput: 'Hello, world!' });
    expect(response.status).toBe(200);
    const responseBody = JSON.parse(response.body[0].content);
    expect(responseBody.Reason).not.toEqual("");  // Check that some response is given
    expect(responseBody.Reason).toMatch(/music|genre|mood|recommendation/); // Check for keywords
  }, 20000);
  
  
  
 
  
const openai = require('openai');

it('should handle API errors', async () => {
  // Mock the OpenAI constructor
  const openAIInstance = {
    beta: {
      threads: {
        create: jest.fn()
      }
    }
  };
  openAIInstance.beta.threads.create.mockRejectedValueOnce(new Error('API error'));
  openai.OpenAI = jest.fn().mockImplementation(() => openAIInstance);

  const response = await request(app)
    .post('/music')
    .send({ userInput: '' });

  expect(response.status).toBe(500);
  expect(response.text).toContain( "An error occurred: 400 Message content must be non-empty.");
});

});

  

