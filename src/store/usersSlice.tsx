
import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',

    initialState: {
        users: [],
        errorMessage: undefined,
    },

    reducers: {
        usersDataPush: (state, { payload }) => {
            state.users = payload;
            state.errorMessage = undefined;
        },
        clearErrorMessageUsers: (state) => {
            state.errorMessage = undefined;
        },
        userDeleteView: (state, { payload }) => {
            console.log('payload', payload)
            state.users = payload;
            state.errorMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { usersDataPush, clearErrorMessageUsers, userDeleteView } = usersSlice.actions;