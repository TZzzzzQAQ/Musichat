// Import the createSlice utility from Redux Toolkit, which simplifies creating reducers and actions
import {createSlice} from '@reduxjs/toolkit';

// Create a slice for the chat bot with createSlice
export const chatBotSlice = createSlice({
    name: 'chatBot',                 // Name of the slice, used in actions and reducer debugging
    initialState: {
        botMessages: []             // Initial state of the slice, starts with an empty array for messages
    },
    reducers: {
        setChatBotMessages: (state, action) => {
            state.botMessages = action.payload; // Reducer to set chat bot messages; replaces all messages with new ones
        }
    },
});

// Export the action creator for setting chat bot messages
export const {setChatBotMessages} = chatBotSlice.actions;

// Export the reducer, which will be used in the store configuration
export default chatBotSlice.reducer;
