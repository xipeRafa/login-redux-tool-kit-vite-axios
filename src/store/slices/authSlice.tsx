
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',

    initialState: {
        status: 'checking', // 'authenticated','not-authenticated',
        user: {}
    },

    reducers: { 
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout } = authSlice.actions;