import {useState, useRef, useEffect} from 'react';
import TrackTable from '../../components/TrackTable';
import AuthRoute from "@/components/AuthRoute.jsx";
import {APP_API_URL} from "../../../config.js";
import {searchAPI} from "@/apis/everyoneDataAPI.jsx";

const ChatWithBot = () => {
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [tracks, setTracks] = useState([]);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [chatHistory]);

    let messages;
    const handleRecommendation = async (event) => {
        event.preventDefault();
        setUserInput('');
        setChatHistory(prev => [...prev, {message: userInput, type: 'user'}]);
        try {
            const response = await fetch(`${APP_API_URL}recommend-music`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userInput})
            });
            if (response.ok) {
                const data = await response.json();
                messages = JSON.parse(data[0].content);
                setChatHistory(prev => [...prev, {message: messages.Reason, type: 'bot'}]);
                if (messages.Music) {
                    let searchParams = {
                        type: 'track',
                        limit: 20,
                        q: messages.Track
                    }
                    const response = await searchAPI(searchParams);
                    setTracks(response.tracks.items);
                }
                setError(''); // Clear error message
            } else {
                throw new Error('Failed to fetch recommendations');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthRoute>
            <div className="h-full flex flex-col overflow-y-auto">
                <div className="flex-1  p-4 ">
                    {chatHistory.map((chat, index) => (
                        <div key={index}
                             className={`flex mt-2 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-xs p-2 rounded-lg  ${chat.type === 'user' ? 'bg-green-300' : 'border-2 shadow-lg'}`}>
                                {chat.message}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
                <form onSubmit={handleRecommendation} className="flex items-center mb-4 p-4">
                    <input
                        type="text"
                        value={userInput}
                        placeholder="Tell me about your music taste..."
                        className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:border-transparent text-black"
                        onChange={(e) => setUserInput(e.target.value)} // Update user input state
                    />
                    <button type="submit"
                            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50">
                        Send
                    </button>
                </form>
                <TrackTable playListData={tracks}/> {/* Display track table */}
            </div>
        </AuthRoute>
    );
};

export default ChatWithBot; // Export the ChatWithBot component
