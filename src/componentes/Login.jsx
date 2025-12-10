import React, {useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { spinnerCargando } from '../features/spinnerSlice';
import { NavLink, useNavigate } from 'react-router-dom';
/*{ "usuario":"jaime",
    "password":"jaime" }
  { "codigo": 200,
    "token": "adadasd",
    "id": 324 }*/

const Login = () => {
    const usuario = useRef(null);
    const password = useRef(null);
    const [botonLogin, setBotonLogin] = useState(false)
    const [error, setError] = useState(false)
    const [mensajeError, setMensajeError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usuarioCarga = useSelector(state => state.spinner.loading);
    const cambioInput = e => {
        usuario.current.value && password.current.value ? setBotonLogin(true) : setBotonLogin(false)
    }
    const ingresar = () => {
        dispatch(spinnerCargando(true))
        const bodyData = {
            usuario: usuario.current.value,
            password: password.current.value,
        }
            fetch(`https://goalify.develotion.com/login.php`, { 
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => {
        if (!response.ok) throw new Error('no ok');
        return response.json();
        })
        .then(data => {
            if(data.codigo === 200){
                localStorage.setItem("iduser", data.id);
                localStorage.setItem("usuario", usuario.current.value);
                localStorage.setItem("token", data.token); 
                setError(false)
                setMensajeError(null);
                navigate("/dashboard/evaluaciones")
                console.log(data);
            }else{
                setError(true)
                setMensajeError(data.mensaje);
            }
            dispatch(spinnerCargando(false))
        }).catch(error =>{
            console.log(error);
            dispatch(spinnerCargando(false))
            setError(true)
            setMensajeError('Fallo conexion con el servidor en login');
        })
        
    }
    return (
    <div id='seccionLogin' className="row justify-content-center align-items-center mt-5">
        <h2>Iniciar sesion</h2>

        <label htmlFor="txtUsuarioLogin">Usuario:</label>
        <input type="text" id='txtUsuarioLogin' placeholder='Ingrese su usuario' ref={usuario} onChange={cambioInput}/>

        <label htmlFor="txtContrasenaLogin">Contraseña:</label>
        <input type="password" id='txtContrasenaLogin' placeholder='Ingrese su contraseña' ref={password} onChange={cambioInput}/>

        <button type='button' className="btn btn-primary" onClick={ingresar} disabled={!botonLogin}>Iniciar Sesion</button>
        <NavLink className="nav-link" to="/registro">Registrarme</NavLink>

        {error ? <p>{mensajeError}</p>: null}
        {usuarioCarga ? <Spinner/> : null}
    </div>
  )
}

export default Login