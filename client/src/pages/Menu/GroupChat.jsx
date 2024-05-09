// Import socket.io-client and React-related hooks
import io from 'socket.io-client';
import { useEffect, useState } from "react";
// Import the useSelector hook from react-redux to access the state in the Redux store
import { useSelector } from "react-redux";
// Import AuthRoute component for route protection, ensuring user authentication
import AuthRoute from "@/components/AuthRoute.jsx";
// Import getMessageAPI function to fetch message data
import { getMessageAPI } from "@/apis/messageAPI.jsx";
import { useRef } from "react";
import {APP_API_URL} from "@/../config.js";


// Define the GroupChat component
const GroupChat = () => {
    // Define component states: socket connection, message text, chat history
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    // Access the user profile from the Redux store using useSelector
    const userState = useSelector((state) => state.user.profile);


    // Create a socket connection and close it when the component unmounts
    useEffect(() => {
        const newSocket = io(`${APP_API_URL}`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    // Listen to the socket's receiveMessage event to add received messages to the chat array
    useEffect(() => {
        if (socket) {
            socket.on('receiveMessage', (msg) => {
                setChat((prev) => {
                    return [...prev, JSON.parse(msg)];
                });
            });
        }
    }, [socket]);

    // Fetch historical messages from the API and add them to the chat array when the component loads for the first time
    useEffect(() => {
        const fetch = async () => {
            const response = await getMessageAPI();
            setChat(prevState => {
                return [...prevState, ...response];
            })
        }
        fetch();
    }, []);

    // Define the function to send messages, use socket.emit to send the message, and clear the message input
    const sendMessage = () => {
        if (socket && message.trim()) {
            socket.emit('sendMessage', JSON.stringify({
                display_name: userState.display_name,
                message: message,
                id: userState.id,
                time: new Date().toISOString(),
                img: userState.images[1].url
            }));
            setMessage('');

        }
    };

    // Handle keyboard events, send the message when the Enter key is pressed
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
    // Use useRef to create a reference for automatically scrolling to the bottom of the chat history
    const messagesEndRef = useRef(null); // Reference to the last message in the chat history
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Automatically scroll to the bottom when chat history updates
    }, [chat]);

    // JSX structure of the component, including the message display area and input area
    return (
        <AuthRoute>
            <div className="h-full flex flex-col ">
                <div className="flex-grow overflow-auto p-3 shadow-inner">
                    {chat.map((msg, index) => (
                        <div key={index} className={`flex mb-4 text-sm items-start ${msg.id === userState.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex ${msg.id === userState.id ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                                
                                <div className={` flex-shrink-0 bg-gray-300 rounded-full w-8 h-8 ${msg.id === userState.id ? 'ml-3' : 'mr-3'}`} >
                                    
                                    <span className="block w-full h-full rounded-full overflow-hidden">
                                        
                                        <img src={msg.img} alt="avatar" className="w-full h-full object-cover" />
                                    </span>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div>
                                        <span className="font-bold text-gray-600 ">{msg.display_name}</span>
                                        <span className="text-gray-500 text-xs ml-2">{new Date(msg.time).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-black leading-normal">{msg.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                    <div className="flex items-center">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder="Type a message..."
                            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none text-black"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </AuthRoute>
    );
};

export default GroupChat;
