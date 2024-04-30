import axios from 'axios';
import {OPENAI_API_KEY} from "@/../config.js";

const api = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
});

export const chatWithGPT = async (message) => {
    try {
        const response = await api.post('/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error contacting OpenAI API:', error);
        return null;
    }
};