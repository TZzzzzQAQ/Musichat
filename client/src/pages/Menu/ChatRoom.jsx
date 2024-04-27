import React, {useState} from 'react';
import {chatWithGPT} from "@/apis/chatgpt.jsx";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const sendMessage = async () => {
        const userMessage = input.trim();
        if (!userMessage)
            return;

        setMessages(prevState => {
            return [...prevState, {sender: 'user', text: userMessage}];
        });

        const botResponse = chatWithGPT(input).then((response) => {
            setMessages(prevState => {
                return [...prevState, {sender: 'chat', text: response}];
            });
        });

        setInput(''); // Clear input after sending
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage();
    };
    return (
        <div className="chat-interface bg-white p-4 shadow rounded">
            <div className="messages space-y-2 mb-4 max-h-80 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index}
                         className={`message p-2 rounded ${message.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-500 text-white mr-auto'}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1 border p-2 rounded-l"
                    placeholder="Type your message here..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatRoom;