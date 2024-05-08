import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthRoute from "@/components/AuthRoute.jsx";
import { getMessageAPI } from "@/apis/messageAPI.jsx";
import { useRef } from "react";


const GroupChat = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const userState = useSelector((state) => state.user.profile);


    useEffect(() => {
        const newSocket = io(`http://localhost:3000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        if (socket) {
            socket.on('receiveMessage', (msg) => {
                setChat((prev) => {
                    return [...prev, JSON.parse(msg)];
                });
            });
        }
    }, [socket]);

    useEffect(() => {
        const fetch = async () => {
            const response = await getMessageAPI();
            setChat(prevState => {
                return [...prevState, ...response];
            })
        }
        fetch();
    }, []);

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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
    const messagesEndRef = useRef(null); // Reference to the last message in the chat history
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Automatically scroll to the bottom when chat history updates
    }, [chat]);

    return (
        <AuthRoute>
            <div className="h-full flex flex-col ">
                <div className="flex-grow overflow-auto p-3 shadow-inner">
                    {chat.map((msg, index) => (
                        <div key={index} className="flex items-start mb-4 text-sm">
                            <div className="flex-shrink-0 bg-gray-300 rounded-full w-8 h-8 mr-3">
                                <span className="block w-full h-full rounded-full overflow-hidden">
                                    <img src={msg.img} alt="avatar" className="w-full h-full object-cover" />
                                </span>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div>
                                    <span className="font-bold text-gray-600">{msg.display_name}</span>
                                    <span className="text-gray-500 text-xs ml-2">{new Date(msg.time).toLocaleTimeString()}</span>
                                </div>
                                <p className="text-black leading-normal">{msg.message}</p>
                            </div>
                        </div >
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
