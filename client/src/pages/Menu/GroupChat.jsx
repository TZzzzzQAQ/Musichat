import ChatContent from "@/components/ChatContent.jsx";

const GroupChat = () => {
    const chatFunction = async (input) => {
        return await chatWithGroup(input)
    }

    return (
        <div className={'h-full'}>
            <ChatContent chatFunction={chatFunction} type={'group'}/>
        </div>
    );
};

export default GroupChat;