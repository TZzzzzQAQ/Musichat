// Import the createSlice function from @reduxjs/toolkit to simplify creating reducers and associated actions
import {createSlice} from '@reduxjs/toolkit';

// Define a slice for chat group functionality using createSlice
export const chatGroupSlice = createSlice({
    name: 'chatGroup',                    // The name of the slice, used as a reference in the store
    initialState: {
        groupMessages: []                // Initial state with an empty array for group messages
    },
    reducers: {
        setChatGroupMessages: (state, action) => {
            state.groupMessages = action.payload;  // Reducer to update the group messages array
        }
    },
});

// Export the generated action creators from the slice
export const {setChatGroupMessages} = chatGroupSlice.actions;

// Export the reducer, which is used when combining reducers in the store configuration
export default chatGroupSlice.reducer;
