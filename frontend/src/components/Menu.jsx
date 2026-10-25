import { useEffect, useState } from 'react';
import { getActividades } from '../api';
import adentro from '../img/adentro-afuera.jpg';
import arriba from '../img/arriba-abajo.jpg';
import cerca from '../img/cerca-lejos.jpg';
import encima from '../img/encima-debajo.jpg';
import figuras from '../img/figuras.jpg';
import memoria from '../img/memoria.jpg';
import multiplicaciones from '../img/multiplicaciones.jpg';
import quebrados from '../img/quebrados.jpg';
import decimales from '../img/multiplicacion-decimal.png';

const ICONOS = { espaciales: '', figuras: '', memoria: '', matematicas: '' };
const COLORES = { espaciales: '', figuras: '', memoria: '', matematicas: '' };

const IMAGENES = {
    'Adentro y Afuera': adentro,
    'Arriba y Abajo': arriba,
    'Cerca y Lejos': cerca,
    'Encima y Debajo': encima,
    'Figuras Geométricas': figuras,
    'Memoria de Pares': memoria,
    'Tablas de Multiplicar': multiplicaciones,
    'Suma de Quebrados': quebrados,
    'Multiplicación con Decimales': decimales,  
};

export default function Menu({ estudiante, onElegir, onSalir }) {
    const [nivel, setNivel] = useState(null);
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        if (nivel) getActividades(nivel).then(setActividades).catch(() => setActividades([]));  
    }, [nivel]);

    return (
        <div className="tarjeta">
            <h2>Bienvenido, {estudiante.nombre} 🎉</h2>
            {!nivel ? (
                <>
                <p className="subtitulo">¿Qué vamos a aprender hoy?</p>
                <button className="btn azul" onClick={() => setNivel('preprimaria')}>🧸 Preprimaria</button>
                <button className="btn rosa" onClick={() => setNivel('primaria')}>🎒 Primaria</button>
                </>
            ) : (
                <>
                <div className="grid">
                    {actividades.map((a) => {
                        const img = IMAGENES[a.nombre];
                        return (
                            <button
                            key={a.id}
                            className={`btn actividad ${COLORES[a.tema]} ${img ? 'con-imagen' : ''}`}
                            onClick={() => onElegir(a)}
                            >
                                {img ? (
                                    <img className="img-actividad" src={img} alt="" />
                                ) : (
                                    <span className="emoji">{ICONOS[a.tema]}</span>
                                )}
                                {a.nombre}
                            </button>
                        );
                    })}
                </div>
                <button className="btn gris" onClick={() => setNivel(null)}>⬅ Volver</button>
                </>
            )}
            <button className="btn gris" onClick={onSalir}>Salir</button>
        </div>
    );
}

