import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { usersSlice } from './usersSlice';
import { productosSlice } from './productosSlice';


export const store = configureStore({

    reducer: {
        authSlice: authSlice.reducer,
        usersSlice: usersSlice.reducer,
        productosSlice: productosSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })

})
