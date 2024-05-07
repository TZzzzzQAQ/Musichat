import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Message from '../message.model'; // Adjust the import path to where your Message model is located

let mongoServer;

beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.error(err);
  }
}, 10000); // Increase timeout to 10 seconds

// Add similar timeout adjustment for other affected test cases if needed

afterAll(async () => {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
  } catch (err) {
    console.error(err);
  }
}, 10000); // Increase timeout to 10 seconds
describe('Message Model Test', () => {
  // Test to ensure that a valid message is saved
  it('should create and save a message successfully', async () => {
    const messageData = {
      message: 'Hello World',
      id: 'msg123',
      display_name: 'John Doe',
      time: new Date()
    };

    const validMessage = new Message(messageData);
    const savedMessage = await validMessage.save();

    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.message).toBe(messageData.message);
    expect(savedMessage.id).toBe(messageData.id);
    expect(savedMessage.display_name).toBe(messageData.display_name);
    expect(savedMessage.time).toBeDefined();
  });

  // Test to ensure required fields are enforced
  it('should not save a message without required fields', async () => {
    const messageData = new Message({
      id: 'msg124'
    });

    try {
      await messageData.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.message).toBeDefined();
      expect(error.errors.display_name).toBeDefined();
      expect(error.errors.time).toBeDefined();
    }
  });
});

