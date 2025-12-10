import React from 'react';
import PuntajeGlobal from './PuntajeGlobal';
import PuntajeDiario from './PuntajeDiario';
import SituacionPersonal from './SituacionPersonal';


 

const Informe = () => {
  return ( 
   <div className="container">
      <h2>Informe</h2>
      
    <div style={{backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '20px'
        }}><PuntajeGlobal /></div>

    <div  style={{backgroundColor: 'rgba(204, 115, 201, 0.7)', padding: '20px', borderRadius: '8px', marginBottom: '20px'
        }}><PuntajeDiario /></div>
    
    <div  style={{ backgroundColor: 'rgba(25, 32, 244, 0.52)',padding: '20px',borderRadius: '8px',marginBottom: '20px'
        }}><SituacionPersonal /></div>
   
  </div>
       
  )
}
export default Informe;
