import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: {}
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.profile = action.payload;
        }
    },
});

export const {setUserProfile} = userSlice.actions;

export default userSlice.reducer;
