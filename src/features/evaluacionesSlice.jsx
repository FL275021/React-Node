import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    evaluaciones: [],
}

export const evaluacionesSlice = createSlice({
    name:"evaluaciones",
    initialState,
    reducers:{
        cargarEvaluaciones:(state, action) =>{
            state.evaluaciones = action.payload;
        },
          agregarEvaluacion:(state, action) => {
            state.evaluaciones.push(action.payload)
        },
         borrarEvaluacion: (state, action) => {
        state.evaluaciones = state.evaluaciones.filter(
        evaluacion => evaluacion.id !== action.payload
    );
}
    }
})

export const { agregarEvaluacion, cargarEvaluaciones, borrarEvaluacion } = evaluacionesSlice.actions

export default evaluacionesSlice.reducer;