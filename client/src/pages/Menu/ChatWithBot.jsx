import React, {useEffect, useState, useRef} from 'react';
import {chatWithGPT} from "@/apis/chatgpt.jsx";
import {Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setChatMessages} from "@/store/features/chatSlice.jsx";

const {Search} = Input;
const ChatWithBot = () => {
    const messagesFromRedux = useSelector(state => state.chat.messages);
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        chatWithGPT('Now that you are a person who loves music, your future answers will all be related to music.');
        if (messagesFromRedux) {
            setMessages(messagesFromRedux);
        }
    }, []);


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        dispatch(setChatMessages(messages));
        scrollToBottom();
    }, [messages]);
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const onSearch = async () => {
        setIsLoading(true);
        const userMessage = input.trim();
        if (!userMessage) {
            setIsLoading(false);
            return;
        }

        setMessages(prevState => [...prevState, {sender: 'user', text: userMessage}]);
        const botResponse = await chatWithGPT(input).then((response) => {
            setMessages(prevState => [...prevState, {sender: 'chat', text: response}]);
        });
        setIsLoading(false);
        setInput('');
    };

    return (
        <div className="flex flex-col w-full h-full p-4 shadow rounded">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 w-full">
                {messages.map((message, index) => (
                    <div key={index}
                         className={`max-w-96 font-poppins p-3 rounded ${message.sender === 'user'
                             ? 'bg-blue-500 text-white ml-auto text-right' : 'bg-gray-500 text-white mr-auto'}`}>
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <Form className="mx-4">
                <Search
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Press Enter to Chat With Bot"
                    enterButton="Send"
                    onSearch={onSearch}
                    size="large"
                    loading={isLoading}
                />
            </Form>
        </div>
    );
};

export default ChatWithBot;
