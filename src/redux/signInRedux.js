import {createSlice} from "@reduxjs/toolkit";

const signInSlice = createSlice({
    name: "signIn",
    initialState:{
        existingUser: JSON.parse(localStorage.getItem("admin")) || null,
        checkingUser: !!localStorage.getItem("admin"),
        error: false
    },
    reducers: {
        signInStart: (state)=>{
            state.checkingUser = true;
        },
        signInSuccess: (state,action)=>{
            state.existingUser = action.payload;
            state.error = false
        },
        signInFailure: (state)=>{
            state.checkingUser = false;
            state.error = true;
        }
    }
});

export const {signInStart, signInSuccess, signInFailure} = signInSlice.actions;
export default signInSlice.reducer;