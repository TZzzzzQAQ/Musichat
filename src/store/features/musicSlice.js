import {createSlice} from '@reduxjs/toolkit';

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        }
    },
});

export const {increment} = musicSlice.actions;

export default musicSlice.reducer;
