import { createSlice } from "@reduxjs/toolkit";

const initialState= JSON.parse(localStorage.getItem('cart'))??[];

const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
         addCart:(state,action)=>{
            state.push(action.payload);
         },
         deleteCart:(state,action)=>{
            return state.filter((item)=>item.id!==action.payload.id);
         }
    }
})

export const {addCart,deleteCart}=CartSlice.actions;
export const Alldata=(state)=>state.cart;
export default CartSlice.reducer