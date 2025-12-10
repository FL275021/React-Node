import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paises: [],
}


export const paisesSlice = createSlice({
    name:"paises",
    initialState,
    reducers:{
        cargarPaises:(state, action) =>{
            state.paises = action.payload;
        }
    }
})


export const { cargarPaises } = paisesSlice.actions

export default paisesSlice.reducer;