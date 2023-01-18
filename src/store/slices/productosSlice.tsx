
import { createSlice } from '@reduxjs/toolkit';

export const productosSlice = createSlice({
    name: 'productos',

    initialState: {
        productos: []
    },

    reducers: {
        productosDataPush: (state, { payload }) => {
            state.productos = payload;
        },
        productoDeleteView: (state, { payload }) => {
            state.productos = payload;
        },
        switchProductoView:(state, {payload})=>{
            state.productos = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { productosDataPush, productoDeleteView, switchProductoView } = productosSlice.actions;