import Eval from "./Eval.jsx";
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner.jsx'
import { spinnerCargando } from '../../features/spinnerSlice.jsx'
import { cargarEvaluaciones } from '../../features/evaluacionesSlice.jsx'
import { cargarObjetivos } from '../../features/objetivosSlice'
import { NavLink, Outlet } from 'react-router-dom'

const ListadoEvaluaciones = () => {

    const dispatch = useDispatch();
    const usuarioCarga = useSelector(state => state.spinner.loading);
    const listaEvaluaciones = useSelector(state => state.evaluacion.evaluaciones);
    const objetivos = useSelector(state => state.objetivos.objetivos);

    const [mensajeErrorListar, setMensajeErrorListar] = useState(null)
    const [errorListar, setErrorListar] = useState(false)
    const [mensajeExitoListar, setMensajeExitoListar] = useState(null)
    const [exitoListar, setExitoListar] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token"); 
        const iduser = localStorage.getItem("iduser");

        fetch('https://goalify.develotion.com/objetivos.php', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'token': token,
                'iduser': iduser
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.codigo === 200) {
                cargarObjetivos(data.objetivos);
                }
            });

 
        dispatch(spinnerCargando(true)); 
              console.log("token:", token, "iduser:", iduser);
            fetch(`https://goalify.develotion.com/evaluaciones.php?idUsuario=${iduser}`, {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "token": token,
                  "iduser": iduser
              },
            })
            .then(response => response.json())
            .then(data => {
              if(data && Array.isArray(data.evaluaciones)) {
                   dispatch(cargarEvaluaciones(data.evaluaciones));
                    setErrorListar(false);
                    setExitoListar(true);
                    setMensajeExitoListar("Evaluaciones cargadas con éxito");
              }
              console.log(listaEvaluaciones);
              dispatch(spinnerCargando(false));
            }).catch(() => {
              setExitoListar(false);
              setMensajeErrorListar("Error al cargar las evaluaciones");
              dispatch(spinnerCargando(false));
            })
          }, []);
 
            return (
        <div id="ListadoEvaluaciones" className="row justify-content-center align-items-center">
            <h2>Evaluaciones</h2>
           <NavLink className="nav-link" to="/dashboard/agregarEval"style={{fontWeight:'bold',backgroundColor:'lightblue',padding:'10px',borderRadius:'5px',
            marginBottom:'20px'}}>
            Agregar Evaluación</NavLink>
            <div className="evaluaciones">
            {objetivos.length > 0 && listaEvaluaciones.map(e => <Eval key={e.id} {...e} objetivos={objetivos}/> )}
            </div>
            {usuarioCarga ? <Spinner/> : null}
            { errorListar ? <p>{mensajeErrorListar}</p>  : null}
            { exitoListar ? <p>{mensajeExitoListar}</p>  : null}
        </div>
    )
}

export default ListadoEvaluaciones

    /* ///////////////////////////////////////////////////////////////////// */


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