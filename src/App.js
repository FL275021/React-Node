import './estilos.css';
import './bootstrap.min.css';
import Login from './componentes/Login';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './componentes/Registro';
import Navbar from './componentes/Navbar';
import AgregarEvaluacion from "./componentes/Evaluacion/AgregarEvaluacion.jsx";
import ListadoEvaluaciones from "./componentes/Evaluacion/ListadoEvaluaciones.jsx";
import Analisis from "./componentes/Analisis/AnalisisPromedio.jsx";
import Informe from "./componentes/Informe/Informe.jsx";

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>  
            <Route path='/' element={<Login />} />      
            <Route path='/registro' element={<Registro />} />  
            <Route path='/dashboard' element={<Navbar />}>
                  <Route path='/dashboard/agregarEval' element={<AgregarEvaluacion />} />
                  <Route path='/dashboard/evaluaciones' element={<ListadoEvaluaciones />} />
                  <Route path='/dashboard/analisis' element={<Analisis />} />
                  <Route path='/dashboard/informe' element={<Informe />} />
                  </Route>
           </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}


export default App;
