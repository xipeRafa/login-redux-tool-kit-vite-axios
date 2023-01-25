
import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',

    initialState: {
        users: [],
        editMode: undefined
    },

    reducers: {
        usersDataPush: (state, { payload }) => {
            state.users = payload;
        },
        editUserView:(state, {payload})=>{
            state.editMode = payload
        },
        defaultEditMode:(state)=>{
            state.editMode = undefined
        },
        userDeleteView: (state, { payload }) => {
            state.users = payload;
        },
        switchUserView:(state, {payload})=>{
            state.users = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { usersDataPush, userDeleteView, switchUserView, editUserView, defaultEditMode } = usersSlice.actions;