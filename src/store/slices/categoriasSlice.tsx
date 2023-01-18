
import { createSlice } from '@reduxjs/toolkit';

export const categoriasSlice = createSlice({
    name: 'categorias',

    initialState: {
        categorias: []
    },

    reducers: {
        categoriasDataPush: (state, { payload }) => {
            state.categorias = payload;  
        },
        categoriaDeleteView: (state, { payload }) => {
            state.categorias = payload;
        },
        switchCategoriaView:(state, {payload})=>{
            state.categorias = payload  
        }
    }
});


// Action creators are generated for each case reducer function
export const { categoriasDataPush, categoriaDeleteView, switchCategoriaView } = categoriasSlice.actions;