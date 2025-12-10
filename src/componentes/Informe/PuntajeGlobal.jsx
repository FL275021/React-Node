import React from 'react';
import { useSelector } from 'react-redux';

/* 4.3.1. Puntaje global: en un componente aparte, se deberá mostrar
el puntaje actual del usuario que se obtendrá del promedio de
todas las calificaciones de todas las evaluaciones. */

const PuntajeGlobal = () => {
  const evaluaciones = useSelector(state => state.evaluacion.evaluaciones);

  if (!evaluaciones || evaluaciones.length === 0) {
    return <div><h3>Puntaje global</h3> Sin evaluaciones</div>;
  }

let suma = 0;
  for (let i = 0; i < evaluaciones.length; i++) {suma += evaluaciones[i].calificacion;}
  
  const promedio = suma / evaluaciones.length;


  return (
    <div>
      <h3>Puntaje global</h3>
      <p>Promedio de todas las calificaciones de todas las evaluaciones: {promedio.toFixed(2)}</p>
    </div>
  );
};

export default PuntajeGlobal;