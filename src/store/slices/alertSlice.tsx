
import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
    name: 'alert',

    initialState: {
        sweetAlertMessage: undefined
    },

    reducers: {
        somethingWentRigth:(state, {payload})=>{
            state.sweetAlertMessage = payload
        },
        somethingWentWrong:(state, {payload})=>{
            state.sweetAlertMessage = payload
        },
        clearAlertMessage: (state) => {
            state.sweetAlertMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const {  clearAlertMessage, somethingWentWrong, somethingWentRigth } = alertSlice.actions;