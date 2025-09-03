import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/LoginSlice";

export default configureStore({
    reducer:{
        "loginSlice":loginSlice
    }
})