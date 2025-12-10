import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement, 
    LineElement
  );

/*
4.4.1. Gráfico de evaluaciones por objetivo: graficar la cantidad
de evaluaciones de ese objetivo, no se muestran en la gráfica
los objetivos que no hayan tenido evaluaciones.
 */

const Analisis = () => {
    const listaEvaluaciones = useSelector(state => state.evaluacion.evaluaciones);
    const listaObjetivos = useSelector(state => state.objetivos.objetivos);

    const colores = listaObjetivos.map(() =>`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);

    const promedioPorObjetivo = listaObjetivos.map(obj => {
    const evaluacionesObj = listaEvaluaciones.filter(e => e.idObjetivo === obj.id);
    const promedio = evaluacionesObj.length > 0 ? evaluacionesObj.reduce((acumula, actual) => acumula + actual.calificacion, 0) / evaluacionesObj.length : 0;
        return {
            nombre: obj.nombre,
            emoji: obj.emoji,
            promedio
        };
    });

    return (
        <div>
            <h2>Analisis de Evaluaciones</h2>

            <Bar 
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'left' },
                        title: { display: true, text: 'Cantidad de evluaciones por objetivos' },
                    },
                }}
                data={{
                    labels: listaObjetivos.map(item => item.nombre),
                    datasets:[{
                        label:'Cantidad',
                        data: listaObjetivos.map(obj =>listaEvaluaciones.filter(e => e.idObjetivo === obj.id).length
                        ),
                        backgroundColor: colores,
                    }]
                }}
            />


            {/* 
            4.4.2. Gráfico de promedio por objetivo: se deberán graficar los
            objetivos (todos),mostrando el promedio de evaluaciones de
            ese objetivo, tener en cuenta que en esta gráfica podrá haber
            valores positivos y negativos conviviendo.  */}
            <Bar
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'left' },
                        title: { display: true, text: 'Promedio de calificación por objetivo' },
                    },
                }}
                data={{
                    labels: promedioPorObjetivo.map(item => item.nombre),
                    datasets: [{
                        label: 'Promedio',
                        data: promedioPorObjetivo.map(item => item.promedio),
                        backgroundColor: colores,
                    }]
                }}
            />
        </div>
    )
}

export default Analisis