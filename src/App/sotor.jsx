
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice  from "../features/ProductSlice";
import  loginSlice  from "../features/loginSlice";



export const store = configureStore({
    reducer:{
        product:ProductSlice,
        user:loginSlice
    }
  
})