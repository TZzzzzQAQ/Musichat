import {createSlice} from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        backgroundTheme: 'box Dust_Red',
        playerColor: '#00FFA7'
    },
    reducers: {
        setBackgroundTheme: (state, action) => {
            state.backgroundTheme = `box ${action.payload}`;
        },
        setPlayerColor: (state, action) => {
            state.playerColor = action.payload;
        }
    },
});

export const {
    setBackgroundTheme
    , setPlayerColor
} = themeSlice.actions;

export default themeSlice.reducer;
