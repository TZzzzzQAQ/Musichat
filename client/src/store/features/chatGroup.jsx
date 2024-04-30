import {createSlice} from '@reduxjs/toolkit';

export const chatGroupSlice = createSlice({
    name: 'chatGroup',
    initialState: {
        groupMessages: []
    },
    reducers: {
        setChatGroupMessages: (state, action) => {
            state.groupMessages = action.payload;
        }
    },
});

export const {setChatGroupMessages} = chatGroupSlice.actions;

export default chatGroupSlice.reducer;
