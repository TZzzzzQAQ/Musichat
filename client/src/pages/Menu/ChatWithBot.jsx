import {chatWithGPT} from "@/apis/chatGPT.jsx";
import ChatContent from "@/components/ChatContent.jsx";

const ChatWithBot = () => {
    const chatFunction = async (input) => {
        return await chatWithGPT(input)
    }

    return (
        <div className={'h-full'}>
            <ChatContent chatFunction={chatFunction} type={'bot'}/>
        </div>
    );
};

export default ChatWithBot;
