import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './CreateSlice'
 export const store=configureStore({
    reducer:{
      cart:CartReducer
    },
    devTools:true
})