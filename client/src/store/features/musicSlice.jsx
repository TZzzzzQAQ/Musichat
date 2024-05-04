import {createSlice} from '@reduxjs/toolkit';

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        searchResult: {},
        nowMusic: {}
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        },
        setNowMusic: (state, action) => {
            state.nowMusic = action.payload;
        }
    },
});

export const {setSearchResult, setNowMusic} = musicSlice.actions;

export default musicSlice.reducer;
