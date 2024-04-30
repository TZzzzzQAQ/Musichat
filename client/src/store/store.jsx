import {configureStore} from '@reduxjs/toolkit';
import musicReducer from '@/store/features/musicSlice.jsx';
import themeReducer from '@/store/features/themeSlice.jsx';
import chatReducer from '@/store/features/chatSlice.jsx';
import userReducer from '@/store/features/userSlice.jsx'

export const store = configureStore({
    reducer: {
        music: musicReducer,
        theme: themeReducer,
        chat: chatReducer,
        user: userReducer,
    },
});
