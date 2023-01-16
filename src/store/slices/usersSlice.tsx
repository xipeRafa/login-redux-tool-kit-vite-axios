
import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',

    initialState: {
        users: [],
        errorMessage: undefined,
        editMode: undefined
    },

    reducers: {
        usersDataPush: (state, { payload }) => {
            state.users = payload;
            state.errorMessage = undefined;
        },
        clearErrorMessageUsers: (state) => {
            state.errorMessage = undefined;
        },
        editUserView:(state, {payload})=>{
            state.editMode=payload
        },
        defaultEditMode:(state)=>{
            state.editMode=undefined
        },
        userDeleteView: (state, { payload }) => {
            state.users = payload;
            state.errorMessage = `Usuario ${payload.alert} fue borrado`;
        },
        switchUserView:(state, {payload})=>{
            state.users = payload
            state.errorMessage = undefined;
            //console.log('state.users :>> ', state.users);
        }
    }
});


// Action creators are generated for each case reducer function
export const { usersDataPush, clearErrorMessageUsers, userDeleteView, switchUserView, editUserView, defaultEditMode } = usersSlice.actions;