// user.model.test.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../user.model'; // Adjust the path to where your User model is located

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model Test', () => {
  // Test to ensure that a valid user is saved
  it('should create and save a user successfully', async () => {
    const userData = {
      country: 'NZ',
      display_name: 'TZzzQAQ',
      email: 'tzzzqaq@gmail.com',
      id: '31zoolhlhtafhrmvbigxbwvnyw2u',
      uri: 'spotify:user:31zoolhlhtafhrmvbigxbwvnyw2u'
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.country).toBe(userData.country);
    expect(savedUser.display_name).toBe(userData.display_name);
    expect(savedUser.uri).toBe(userData.uri);
    expect(savedUser.id).toBe(userData.id);
  });

  // Test to check for unique email constraint
  it('should not allow duplicate email addresses', async () => {
    const userData = {
      country: 'NZ',
      display_name: 'Kheang',
      email: 'lykheang333@gmail.com', // Duplicate email
      id: '31b25szgrivd5mkpaxhei4vnc5xm',
      uri: 'spotify:user:31b25szgrivd5mkpaxhei4vnc5xm'
    };

    try {
      await new User(userData).save();
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.errors['email'].message).toContain('duplicate key error');
    }
  });

  // Test to ensure validation works for required fields
  it('should validate the required fields', async () => {
    const user = new User({});
    try {
      await user.save();
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.errors['country']).toBeDefined();
      expect(err.errors['display_name']).toBeDefined();
      expect(err.errors['email']).toBeDefined();
      expect(err.errors['id']).toBeDefined();
      expect(err.errors['uri']).toBeDefined();
    }
  });
});
