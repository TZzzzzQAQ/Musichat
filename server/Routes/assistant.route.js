import express from 'express';
import {OpenAI} from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_API_KEY});

const musicRoutes = express.Router();
musicRoutes.post('/', async (req, res) => {
    try {
        const {userInput} = req.body;
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: userInput
            }
        );

        const run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            {
                assistant_id: process.env.VITE_OPENAI_ASSISTANT_ID
            }
        );

        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(run.thread_id);
            res.json(messages.data.map(message => ({
                role: message.role,
                content: message.content[0].text.value
            })));
        } else {
            res.status(500).send(`Run status: ${run.status}`);
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        res.status(500).send(`An error occurred: ${error.message}`);
    }
});

export default musicRoutes;
