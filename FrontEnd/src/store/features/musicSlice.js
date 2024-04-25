import {createSlice} from '@reduxjs/toolkit';

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        searchResult: {}
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        }
    },
});

export const {setSearchResult} = musicSlice.actions;

export default musicSlice.reducer;
