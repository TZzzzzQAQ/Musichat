import express from 'express'; // Importing Express.js library
import {OpenAI} from 'openai'; // Importing OpenAI SDK
import dotenv from 'dotenv'; // Importing dotenv to manage environment variables
dotenv.config(); // Load environment variables from .env file into process.env

const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_API_KEY}); // Initializing OpenAI with an API key from environment variables


const musicRoutes = express.Router(); // Creating a new Express router for music-related routes
// Define a POST endpoint for the music router
musicRoutes.post('/', async (req, res) => {
    try {
        const {userInput} = req.body; // Extracting userInput from the request body
        const thread = await openai.beta.threads.create(); // Creating a new thread in OpenAI
        await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: userInput
            }
        );

        // Running the thread and polling for a response
        const run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            {
                assistant_id: process.env.VITE_OPENAI_ASSISTANT_ID
            }
        );

        // Check if the run completed successfully
        if (run.status === 'completed') {
            // List messages in the completed thread
            const messages = await openai.beta.threads.messages.list(run.thread_id);
            // Send the content of the messages back to the client, formatted as JSON
            res.json(messages.data.map(message => ({
                role: message.role,
                content: message.content[0].text.value
            })));
        } else {
            // If the run didn't complete successfully, send an error status
            res.status(500).send(`Run status: ${run.status}`);
        }
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error(`An error occurred: ${error.message}`);
        res.status(500).send(`An error occurred: ${error.message}`);
    }
});

export default musicRoutes; // Export the router to be used in other parts of the application
