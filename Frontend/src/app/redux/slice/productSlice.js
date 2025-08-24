import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    products:[]
}

export const productSlice = createSlice({
    name: 'Products',
    initialState,
    reducers:{
        addProduct:(state,action)=>{
            state.products.push(action.payload);
        }
    }
})