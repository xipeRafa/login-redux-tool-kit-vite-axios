import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { usersSlice } from './slices/usersSlice';
import { productosSlice } from './slices/productosSlice';

import { categoriasSlice } from './slices/categoriasSlice';
import { alertSlice } from './slices/alertSlice';


export const store = configureStore({

    reducer: {
        authSlice: authSlice.reducer,
        usersSlice: usersSlice.reducer,
        productosSlice: productosSlice.reducer,
        
        categoriasSlice: categoriasSlice.reducer,
        alertSlice: alertSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })

})
