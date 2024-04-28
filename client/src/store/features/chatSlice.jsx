import {createSlice} from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: []
    },
    reducers: {
        setChatMessages: (state, action) => {
            state.messages = action.payload;
        }
    },
});

export const {setChatMessages} = chatSlice.actions;

export default chatSlice.reducer;
