
import { createSlice } from '@reduxjs/toolkit';

export const productosSlice = createSlice({
    name: 'productos',

    initialState: {
        productos: [],
        errorMessage: undefined,
    },

    reducers: {
        productosDataPush: (state, { payload }) => {
            state.productos = payload;
            state.errorMessage = undefined;
        },
        clearErrorMessageProductos: (state) => {
            state.errorMessage = undefined;
        },
        productoDeleteView: (state, { payload }) => {
            state.productos = payload;
            state.errorMessage = undefined;
        },
        switchProductoView:(state, {payload})=>{
            state.productos = payload
            state.errorMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { productosDataPush, clearErrorMessageProductos, productoDeleteView, switchProductoView } = productosSlice.actions;