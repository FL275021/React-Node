/*
4.3.3. Situación personal: Mostrar en un componente independiente
un emoji de carita triste, normal o feliz dependiendo de si el
usuario tiene un puntaje global, negativo, neutro (cero) o
positivo. */

import React from 'react';
import { useSelector } from 'react-redux';

const SituacionPersonal = () => {
  const evaluaciones = useSelector(state => state.evaluacion.evaluaciones);

  if (!evaluaciones || evaluaciones.length === 0) {
    return <div><h3>Situación personal: 😐</h3></div>;
  }

  const suma = evaluaciones.reduce((acumulador, actual) => acumulador + actual.calificacion, 0);
  const promedio = suma / evaluaciones.length;

  let emoji = '😐';
  if (promedio > 0) emoji = '😊';
  else if (promedio < 0) emoji = '😢';

  return (
    <div>
     <h3> Situación personal</h3>
     <h1> {emoji}</h1>
    </div>
  );
};

export default SituacionPersonal;