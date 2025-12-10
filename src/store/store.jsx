import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "../features/spinnerSlice";
import paisesReducer from "../features/paisesSlice";
import objetivosReducer from "../features/objetivosSlice";
import evaluacionesReducer from "../features/evaluacionesSlice";

export const store = configureStore({
    reducer:{
        spinner: spinnerReducer,
        pais: paisesReducer,
        objetivos: objetivosReducer,
        evaluacion: evaluacionesReducer,
    }
})