import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { usersSlice } from './usersSlice';


export const store = configureStore({

    reducer: {
        authSlice: authSlice.reducer,
        usersSlice: usersSlice.reducer,

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })

})
