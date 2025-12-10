import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objetivos: [],
}


export const objetivosSlice = createSlice({
    name:"objetivos",
    initialState,
    reducers:{
        cargarObjetivos:(state, action) =>{
            state.objetivos = action.payload;
        }
    }
})


export const { cargarObjetivos } = objetivosSlice.actions

export default objetivosSlice.reducer;