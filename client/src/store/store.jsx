import {configureStore} from '@reduxjs/toolkit';
import musicReducer from '@/store/features/musicSlice.jsx';
import themeReducer from '@/store/features/themeSlice.jsx';

export const store = configureStore({
    reducer: {
        music: musicReducer,
        theme: themeReducer,
    },
});
