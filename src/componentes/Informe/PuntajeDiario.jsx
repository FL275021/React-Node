/* 4.3.2. Puntaje diario: en otro componente mostrar el puntaje diario
del usuario que se obtendrá del promedio de todas las
calificaciones de todas las evaluaciones del día de hoy. */

import React from 'react';
import { useSelector } from 'react-redux';

const PuntajeDiario = () => {
  const evaluaciones = useSelector(state => state.evaluacion.evaluaciones);
  const hoy = new Date().toISOString().split('T')[0];
  const evalDeHoy = evaluaciones ? evaluaciones.filter(e => e.fecha === hoy) : [];

  if (!evalDeHoy.length) {
    return <div> <h3>Puntaje diario</h3>Sin evaluaciones hoy</div>;
  }

  const suma = evalDeHoy.reduce((acc, curr) => acc + curr.calificacion, 0);
  const promedio = suma / evalDeHoy.length;

  return (
    <div>
      <h3>Puntaje diario</h3>
      <p>promedio de todas las alificaciones de todas las evaluaciones del día de hoy: {promedio.toFixed(2)}</p>
    </div>
  );
};

export default PuntajeDiario;