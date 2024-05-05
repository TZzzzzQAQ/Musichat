import {Form, Input, notification} from "antd";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceFrown} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

const {Search} = Input;
const iconColor = {color: "#74C0FC"};

const ChatContent = ({chatFunction, type}) => {
    const [api, contextHolder] = notification.useNotification();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const dataFromRedux = useSelector(state => type === 'bot' ? state?.theme?.chatBot?.botMessage : state?.theme?.chatGroup?.groupMessage)

    useEffect(() => {
        if (dataFromRedux === undefined) {
            return
        }
        if (!dataFromRedux) {
            setMessages(dataFromRedux)
        }
    }, []);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const onSearch = async () => {
        setIsLoading(true);
        const userMessage = input.trim();
        if (!userMessage) {
            api.open({
                message: 'Warning',
                description:
                    'You have sent nothing. Please try again!',
                icon: (
                    <FontAwesomeIcon icon={faFaceFrown} style={iconColor}/>
                ),
            });
            setIsLoading(false);
            return;
        }
        await chatFunction({input}).then((response) => {
            setMessages(prevState => [...prevState, {sender: 'user', text: userMessage}]);
            setMessages(prevState => [...prevState, {sender: type, text: response}]);
        }).catch(error => {
            console.log(error)
        });
        setIsLoading(false);
        setInput('');
    };
    return (
        <div className={'h-full'}>
            {contextHolder}
            <div className="flex flex-col w-full h-full p-4 shadow rounded">
                <div className="flex-1 overflow-y-auto space-y-2 mb-4 w-full">
                    {messages?.map((message, index) => (
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
                        placeholder={`Press enter to chat with ${type}`}
                        enterButton="Send"
                        onSearch={onSearch}
                        size="large"
                        loading={isLoading}
                    />
                </Form>
            </div>
        </div>
    );
};

export default ChatContent;