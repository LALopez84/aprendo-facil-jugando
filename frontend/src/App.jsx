import { useState } from 'react';
import Inicio from './components/Inicio';
import Registro from './components/Registro';
import Menu from './components/Menu';
import Juego from './components/Juegos';
import Memoria from './components/Memoria';
import Tablero from './components/Tablero';
import './App.css';

export default function App() {
  const [rol, setRol] = useState(null);
  const [estudiante, setEstudiante] = useState(null);
  const [actividad, setActividad] = useState(null);
  const volver = () => setActividad(null);
  const cerrarSesion = () => {
    setEstudiante(null);
    setActividad(null);
    setRol(null);
  };

  let pantalla;
  if (rol === 'docente') {
    pantalla = <Tablero onSalir={cerrarSesion} />;
  } else if (rol !== 'estudiante') {
    pantalla = <Inicio onEstudiante={() => setRol('estudiante')} onDocente={() => setRol('docente')} />;
  } else if (!estudiante) {
    pantalla = <Registro onListo={setEstudiante} onVolver={cerrarSesion} />;
  } else if (!actividad) {
    pantalla = <Menu estudiante={estudiante} onElegir={setActividad} onSalir={cerrarSesion} />;
  } else if (actividad.tema === 'memoria') {
    pantalla = <Memoria key={actividad.id} estudiante={estudiante} actividad={actividad} onSalir={volver} />;
  } else {
    pantalla = <Juego key={actividad.id} estudiante={estudiante} actividad={actividad} onSalir={volver} />;
  }
    
  return (
    <div className="app">
      <h1 className="titulo">🎮 Aprendo Fácil Jugando 🎮</h1>
      {pantalla}
    </div>
  );
}