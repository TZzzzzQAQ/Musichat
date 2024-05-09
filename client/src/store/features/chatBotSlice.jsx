import {createSlice} from '@reduxjs/toolkit';

export const chatBotSlice = createSlice({
    name: 'chatBot',
    initialState: {
        botMessages: []
    },
    reducers: {
        setChatBotMessages: (state, action) => {
            state.botMessages = action.payload;
        }
    },
});

export const {setChatBotMessages} = chatBotSlice.actions;

export default chatBotSlice.reducer;
