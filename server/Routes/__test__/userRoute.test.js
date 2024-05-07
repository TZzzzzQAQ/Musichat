import supertest from 'supertest';
import express from 'express';
import userRoute from '../user.route'; // Ensure the path is correct based on your project structure

// Import and mock the controller
import { saveData } from '../../Controllers/user.controller';
jest.mock('../../Controllers/user.controller', () => ({
    saveData: jest.fn().mockImplementation((req, res) => res.status(201).send({ message: "Data saved successfully" }))
}));

const app = express();
app.use(express.json()); // Setup JSON body parsing middleware
app.use('/user', userRoute); // Mount the user route for testing

const request = supertest(app);

describe('PUT /user/login', () => {
    beforeEach(() => {
        // Reset the mock before each test
        saveData.mockClear();
    });

    test('should save user data and return 201 status', async () => {
        const userData = {
            username: 'testUser',
            email: 'test@example.com'
        };

        // Perform the PUT request
        const response = await request.put('client/src/apis/chatGroupAPI.jsx').send(userData);

        // Basic response checks
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Data saved successfully');

        // Check that saveData is called correctly
        expect(saveData).toHaveBeenCalled();
        expect(saveData).toHaveBeenCalledWith(
            expect.objectContaining({
                body: expect.objectContaining({
                    username: userData.username,
                    email: userData.email
                })
            }),
            expect.anything()  // This captures the response object, which is typically complex and handled internally by Express.
        );
    });
});
