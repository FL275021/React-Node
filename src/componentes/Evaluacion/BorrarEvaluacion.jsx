    const dispatch = useDispatch();
    const [botonBorrar, setBotonBorrar] = useState(false);
    const [mensajeErrorBorrar, setMensajeErrorBorrar] = useState(null)
    const [errorBorrar, setErrorBorrar] = useState(false)
    const [mensajeExitoBorrar, setMensajeExitoBorrar] = useState(null)
    const [exitoBorrar, setExitoBorrar] = useState(false)


const borrarEvaluacion = (idEval) => {
  const token = localStorage.getItem("token");
  const iduser = localStorage.getItem("iduser");
    dispatch(spinnerCargando(true));
      fetch(`https://goalify.develotion.com/evaluaciones.php?idEvaluacion=` + idEval, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'iduser': iduser
        }
    })
    .then(response => response.json())
    .then(data => { 
         if (data.codigo === 200) { 
            dispatch(borrarEvaluacion(idEval));
            setErrorBorrar(false);
            setExitoBorrar(true);
            setMensajeExitoBorrar("Evaluacion borrada con exito")
        }else{
            setErrorBorrar(true);
            setMensajeErrorBorrar("Error en el proceso de borrar")
            setExitoBorrar(false);
        }
        dispatch(spinnerCargando(false));
    }).catch(error => {
        setErrorBorrar(true);
        setExitoBorrar(false);
        setMensajeErrorBorrar('Fallo conexion con el servidor en borrar')
        dispatch(spinnerCargando(false));
    })
}

export default borrarEvaluacion