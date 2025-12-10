import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { cargarPaises } from '../features/paisesSlice'
import { spinnerCargando } from '../features/spinnerSlice';
import { NavLink, useNavigate } from 'react-router-dom';

/*{ "usuario": "jaime",
    "password":"jaime",
    "idPais": 27    }
  { "codigo": 200,
    "token": "asdasdad",
    "id": 324       } */

const Registro = () => {
        const pais = useRef(null);
        const usuario = useRef(null);
        const password = useRef(null);
        const listaPaises = useSelector(state => state.pais.paises) || [];
    
        const [botonLogin, setBotonLogin] = useState(false)
        const [error, setError] = useState(false)
        const [mensajeError, setMensajeError] = useState('');
    
        const dispatch = useDispatch();
        const navigate = useNavigate();
    
        const usuarioCarga = useSelector(state => state.spinner.loading);

            useEffect(() => {
                dispatch(spinnerCargando(true));
              fetch(`https://goalify.develotion.com/paises.php`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
              })
                .then(response => response.json())
                .then(data => {
                if (data && Array.isArray(data.paises)) {
                dispatch(cargarPaises(data.paises));
                }
                dispatch(spinnerCargando(false));
                })
               }, []);
    
        const cambioInput = e => {
            usuario.current.value && password.current.value && pais.current.value ? setBotonLogin(true) : setBotonLogin(false)
        }

            const registrar = () => {
                dispatch(spinnerCargando(true))
                const bodyData = {
                    usuario: usuario.current.value,
                    password: password.current.value,
                    idPais: pais.current.value,
                    logged: true
                }
        

                fetch(`https://goalify.develotion.com/usuarios.php`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData)
                })
                .then(response => response.json())
                .then(data => {
                    if(data.logged === true){
                        localStorage.setItem("id", data.id);
                        localStorage.setItem("usuario", data.usuario);
                        localStorage.setItem("pais", data.idPais);
                        setError(false)
                        setMensajeError('Usuario registrado correctamente');
                        navigate("/dashboard/evaluaciones")
                    }else{
                        setError(true)
                        setMensajeError(data.mensaje);
                    }
                    dispatch(spinnerCargando(false))
                }).catch(error =>{
                    dispatch(spinnerCargando(false))
                    setError(true)
                    setMensajeError('Fallo conexion con el servidor en login');
                })
                
            }
console.log(listaPaises);
  return (
    <div id="seccionRegistro" className="row justify-content-center align-items-center mt-5">
        <h2>Registro</h2>

        <label htmlFor="txtUsuarioRegistro">Usuario:</label>
        <input type="text" id='txtUsuarioRegistro' placeholder='Ingrese su usuario' ref={usuario} onChange={cambioInput}/>

        <label htmlFor="txtContrasenaRegistro">Contraseña:</label>
        <input type="password" id='txtContrasenaRegistro' placeholder='Ingrese su contraseña' ref={password} onChange={cambioInput}/>

        <label htmlFor="pais">Pais</label>        
        <select name="pais" id="pais" ref={pais} onChange={cambioInput}>
        <option value="">seleccione un pais</option>
        {(Array.isArray(listaPaises) ? listaPaises : []).map(est => (
        <option key={est.id} value={est.id}>
        {est.name} ({est.id})
        </option>
        ))}
        </select>


        <button type='button' className="btn btn-info" onClick={registrar} disabled={!botonLogin}> Registrarme e ingresar</button>
                <NavLink className="nav-link" to="/">Tengo una cuenta</NavLink>    
        {error ? <p>{mensajeError}</p>: null}
        {usuarioCarga ? <Spinner/> : null}
    </div>
  )
}

export default Registro