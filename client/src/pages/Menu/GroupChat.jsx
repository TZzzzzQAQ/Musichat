import io from 'socket.io-client';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AuthRoute from "@/components/AuthRoute.jsx";

const GroupChat = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const dataFromRedux = useSelector(state => state.user);

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

    const sendMessage = () => {
        if (socket) {
            socket.emit('sendMessage', JSON.stringify({
                display_name: dataFromRedux.profile.display_name,
                message: message,
                id:dataFromRedux.profile.id,
                time:new Date().toISOString()
            }));
            setMessage('');
        }
    };

    return (
        <AuthRoute>
            <div className="h-full flex flex-col p-4">
                <div className="flex flex-col flex-grow overflow-auto p-3 shadow">
                    {chat.map((msg, index) => (
                        <p key={index} className="text-gray-800 text-sm my-1">
                            <span className="font-medium text-blue-500">{msg.display_name}:</span>
                            {msg.message}
                        </p>
                    ))}
                </div>
                <div className="mt-4 flex">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>

        </AuthRoute>
    );
};

export default GroupChat;