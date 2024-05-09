import {configureStore} from '@reduxjs/toolkit';

import musicReducer from '@/store/features/musicSlice.jsx';
import themeReducer from '@/store/features/themeSlice.jsx';
import chatBotReducer from '@/store/features/chatBotSlice.jsx';
import userReducer from '@/store/features/userSlice.jsx';
import chatGroupReducer from '@/store/features/chatGroup.jsx';

export const store = configureStore({
    reducer: {
        music: musicReducer,
        theme: themeReducer,
        chatBot: chatBotReducer,
        user: userReducer,
        chatGroup: chatGroupReducer
    },
});
