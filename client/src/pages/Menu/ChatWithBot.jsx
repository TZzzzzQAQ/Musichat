import { useState } from 'react';

const ChatWithBot = () => {
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    let messages;

    const handleRecommendation = async (event) => {
        event.preventDefault();
        setUserInput('');
        setChatHistory(prev => [...prev, { message: userInput, type: 'user' }]);
        try {
            const response = await fetch('http://localhost:3000/recommend-music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userInput })
            });

            if (response.ok) {
                const data = await response.json();
                messages = JSON.parse(data[0].content)
                setChatHistory(prev => [...prev, { message: messages.Reason, type: 'bot' }]);
                if (messages.Music) {
                    console.log(messages.Track);
                    console.log(messages.Artist);
                }

                setError('');
                
            } else {
                throw new Error('Failed to fetch recommendations');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="h-full flex flex-col ">
            <div className="flex-1 overflow-y-auto p-4 ">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex mt-2 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-2 rounded-lg  ${chat.type === 'user' ? 'bg-green-300' : 'border-2 shadow-lg'}`}>
                            {chat.message}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleRecommendation} className="flex items-center mb-4 p-4">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Tell me about your music taste..."
                    className="flex-1 px-4 py-2 border  rounded-l-md focus:outline-none focus:ring-2 focus:border-transparent"
                />
                <button type="submit"
                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50">
                    Send
                </button>
            </form>
            {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
    );
};

export default ChatWithBot;
