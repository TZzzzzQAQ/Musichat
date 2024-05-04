import {createSlice} from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDaylight: true,
        backgroundTheme: 'box Dust_Red',
        playerColor: '#00FFA7'
    },
    reducers: {
        setBackgroundTheme: (state, action) => {
            state.backgroundTheme = `box ${action.payload}`;
        },
        setPlayerColor: (state, action) => {
            state.playerColor = action.payload;
        },
        setIsDaylight: (state, action) => {
            state.isDaylight = action.payload;
        }
    },
});

export const {
    setBackgroundTheme,
    setPlayerColor,
    setIsDaylight
} = themeSlice.actions;

export default themeSlice.reducer;
