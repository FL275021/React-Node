import { useDispatch, useSelector } from 'react-redux';
import { spinnerCargando } from '../../features/spinnerSlice'
import { borrarEvaluacion as Borrar } from '../../features/evaluacionesSlice';

const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Eval = ({ id, idObjetivo, calificacion, fecha }) => {
    const dispatch = useDispatch();

    const listaObjetivos = useSelector(state => state.objetivos.objetivos);
    const objetivo = listaObjetivos.find(obj => obj.id === idObjetivo);

    if (!objetivo) return null;
    
    const emoji = decodeHtml(objetivo.emoji);
    const nombre = objetivo.nombre;
       
    const handleDelete = () => {
        const token = localStorage.getItem("token");
        const iduser = localStorage.getItem("iduser");
        fetch(`https://goalify.develotion.com/evaluaciones.php?idEvaluacion=${id}`, {
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
                dispatch(Borrar(id));
            } else {
                alert("No se pudo borrar la evaluación");
            }
        })
        .catch(() => {
            alert("Error de conexión al borrar la evaluación");
        });
    };

    return (
        console.log("listaObjetivos:", listaObjetivos),
        <div className="evaluacion">
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Objetivo:</strong> {`${emoji} ${nombre}`}</p>
            <p><strong>Calificación:</strong> {calificacion}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
            <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
        </div>
    );
}

export default Eval