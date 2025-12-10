import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'
import { spinnerCargando } from '../../features/spinnerSlice'
import { cargarObjetivos } from '../../features/objetivosSlice'
import { agregarEvaluacion } from '../../features/evaluacionesSlice'

const AgregarEvaluacion = () => {

    const calificacion = useRef(null);
    const fecha = useRef(null);
    const objetivo = useRef(null);
    const dispatch = useDispatch();
    const usuarioCarga = useSelector(state => state.spinner.loading);
    const listaObjetivos = useSelector(state => state.objetivos.objetivos);

    const [botonAgregar, setBotonAgregar] = useState(false);
    const [mensajeErrorAgregar, setMensajeErrorAgregar] = useState(null)
    const [errorAgregar, setErrorAgregar] = useState(false)
    const [mensajeExitoAgregar, setMensajeExitoAgregar] = useState(null)
    const [exitoAgregar, setExitoAgregar] = useState(false)

    useEffect(() => {
      dispatch(spinnerCargando(true));
          const token = localStorage.getItem("token");
          const iduser = localStorage.getItem("iduser");
          console.log("token:", token, "iduser:", iduser);
      fetch(`https://goalify.develotion.com/objetivos.php`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
            "iduser": iduser
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data && Array.isArray(data.objetivos)) {
            //dispatch(cargarEvaluaciones(data))
             dispatch(cargarObjetivos(data.objetivos));
        }
        console.log(listaObjetivos);
        dispatch(spinnerCargando(false));
      }).catch((error) => {
        dispatch(spinnerCargando(false));
      })
    }, []);

    

/*     //////////////////////////////////////////////////////////////////////// */

    const datosCompletos = e => {
    objetivo.current.value && calificacion.current.value && fecha.current.value ?
            setBotonAgregar(true) : setBotonAgregar(false) 
    }


/*     //////////////////////////////////////////////////////////////////////// */

const agregarNuevaEvaluacion = () => {
  const token = localStorage.getItem("token");
  const iduser = localStorage.getItem("iduser");
    dispatch(spinnerCargando(true));
    const bodyData = {
        idObjetivo: objetivo.current.value,
        idUsuario: iduser,
        calificacion: calificacion.current.value,
        fecha: fecha.current.value       
    }
      fetch(`https://goalify.develotion.com/evaluaciones.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token, 
            'iduser': iduser
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(data => { 
        if(data) {
            dispatch(agregarEvaluacion(data));
            setErrorAgregar(false);
            setExitoAgregar(true);
            setMensajeExitoAgregar("Evaluacion realizada con exito")
            calificacion.current.value = '';
            fecha.current.value = '';
        }else{
            setErrorAgregar(true);
            setMensajeErrorAgregar("Error en el proceso de evaluacion")
            setExitoAgregar(false);
        }  
        console.log(objetivo.current.value)
        dispatch(spinnerCargando(false));
    }).catch(error => {
        setErrorAgregar(true);
        setExitoAgregar(false);
        setMensajeErrorAgregar('Fallo conexion con el servidor en agregar')
        dispatch(spinnerCargando(false));
    })
}
    /*     //////////////////////////////////////////////////////////////////////// */
  return (
    
    <div id="agregarEvaluacion" className="row  justify-content-center">
        <h2>Agregar una evaluacion</h2>
        
        <label htmlFor="objetivo">Objetivos</label>
        <select name="objetivo" id="objetivo" ref={objetivo} onChange={datosCompletos} > 
            <option value="">Seleccione un objetivo</option>
            {Array.isArray(listaObjetivos) ? listaObjetivos.map(obj => (
            <option key={obj.id} value={obj.id}>{obj.nombre}</option>)) : null}
        </select>

        <label htmlFor="calificacion">Calificacion</label>
        <input type="number" id='calificacion' placeholder='Ingrese calificacion' ref={calificacion} onChange={datosCompletos}/>

        <label htmlFor="fecha" className="form-label">Fecha</label>
        <input type="date" className="form-control" id="fecha" ref={fecha} onChange={datosCompletos}/>
       
        <button type='button' className='btn btn-primary mt-3' disabled={!botonAgregar} onClick={agregarNuevaEvaluacion}>Agregar</button>
        {usuarioCarga ? <Spinner/> : null}
        { errorAgregar ? <p>{mensajeErrorAgregar}</p>  : null}
        { exitoAgregar ? <p>{mensajeExitoAgregar}</p>  : null}
    </div>
  )
}

export default AgregarEvaluacion

/*  "evaluaciones": [
        {
            "id": 5,
            "idObjetivo": 3,
            "idUsuario": 10,
            "calificacion": -2,
            "fecha": "2025-02-21"
        },
        {
            "id": 6,
            "idObjetivo": 3,
            "idUsuario": 10,
            "calificacion": 3,
            "fecha": "2025-02-21"
        }, 
        
         "codigo": 200,
    "objetivos": [
        {
            "id": 1,
            "nombre": "Salud",
            "emoji": "&#127973"
        },
        {
            "id": 2,
            "nombre": "Finanzas",
            "emoji": "&#128176"
        },
        */

/*{
    "id": 3659,
    "mensaje": "Evaluación ingresada con éxito",
    "codigo": 200
}*/

/*     //////////////////////////////////////////////////////////////////////// */


