import { configureStore } from "@reduxjs/toolkit";
import signInRedux from "./signInRedux";

export const store = configureStore({
    reducer:{
        signIn: signInRedux
    }
})