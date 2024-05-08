// Import the configureStore utility from Redux Toolkit to set up the store
import {configureStore} from '@reduxjs/toolkit';

// Import individual slice reducers for managing specific pieces of state
import musicReducer from '@/store/features/musicSlice.jsx';        // Handles state for music-related data
import themeReducer from '@/store/features/themeSlice.jsx';       // Manages theme-related state, such as light or dark mode
import chatBotReducer from '@/store/features/chatBotSlice.jsx';   // Manages state for chat bot interactions
import userReducer from '@/store/features/userSlice.jsx';         // Handles user-specific state like authentication
import chatGroupReducer from '@/store/features/chatGroup.jsx';    // Manages state related to chat groups

// Configure the Redux store
export const store = configureStore({
    reducer: {
        music: musicReducer,        // Connects the music reducer to the store under the "music" key
        theme: themeReducer,        // Connects the theme reducer under the "theme" key
        chatBot: chatBotReducer,    // Assigns the chat bot reducer to the "chatBot" key
        user: userReducer,          // Assigns the user reducer under the "user" key
        chatGroup: chatGroupReducer // Links the chat group reducer under the "chatGroup" key
    },
});
