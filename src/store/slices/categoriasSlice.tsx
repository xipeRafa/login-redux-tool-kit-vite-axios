
import { createSlice } from '@reduxjs/toolkit';

export const categoriasSlice = createSlice({
    name: 'categorias',

    initialState: {
        categorias: [],
        errorMessage: undefined,
    },

    reducers: {
        categoriasDataPush: (state, { payload }) => {
            state.categorias = payload;
            state.errorMessage = undefined;
        },
        clearErrorMessageCategorias: (state) => {
            state.errorMessage = undefined;
        },
        categoriaDeleteView: (state, { payload }) => {
            console.log('payloadDelete', payload)
            state.categorias = payload;
            state.errorMessage = undefined;
        },
        switchCategoriaView:(state, {payload})=>{
            console.log('payloadToggle', payload)
            state.categorias = payload
            state.errorMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { categoriasDataPush, clearErrorMessageCategorias, categoriaDeleteView, switchCategoriaView } = categoriasSlice.actions;