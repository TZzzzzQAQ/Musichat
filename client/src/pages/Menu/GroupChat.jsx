import ChatContent from "@/components/ChatContent.jsx";
import {sendMessageAPI} from "@/apis/chatGroupAPI.jsx";

const GroupChat = () => {
    const chatFunction = async (input) => {
        return sendMessageAPI(input);
    }

    return (
        <div className={'h-full'}>
            <ChatContent chatFunction={chatFunction} type={'group'}/>
        </div>
    );
};

export default GroupChat;