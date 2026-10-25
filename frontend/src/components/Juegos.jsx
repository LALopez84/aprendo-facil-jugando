import { useEffect, useState } from 'react';
import { guardarProgreso } from '../api';
import { generarPreguntas } from '../data/preguntas';

const FORMAS ={
    Círculo: <div className="forma circulo" />,
    Cuadrado: <div className="forma cuadrado" />,
    Triángulo: <div className="forma triangulo" />,
    Rectángulo: <div className="forma rectangulo" />,
};

function Escena({ e }) {
    if (!e) return null;
    if (e.caja) {
        return (
            <div className="escena">
                <div className="caja">{e.dentro && <span>{e.item}</span>}</div>
                {!e.dentro && <span>{e.item}</span>}
            </div>
        );
    }
    return <div className="escena linea">{e.texto}</div>;
}

export default function Juego({ estudiante, actividad, onSalir }) {
    const [preguntas, setPreguntas] = useState(() => generarPreguntas(actividad));
    const [i, setI] = useState(0);
    const [elegida, setElegida] = useState(null);
    const [aciertos, setAciertos] = useState(0);
    const [estado, setEstado] = useState('');

    const fin = i >= preguntas.length;
    const puntaje = aciertos * 10;
    const p = preguntas[i];

    const responder = (op) => {
        if (elegida) return;
        setElegida(op);
        if (op === p.correcta) setAciertos((a) => a + 1);
        setTimeout(() => {
            setElegida(null);
            setI((n) => n + 1);
        }, 1300);
    };

    useEffect(() => {
        if (fin) {
            guardarProgreso({
                estudiante_id: estudiante.id,
                actividad_id: actividad.id,
                puntaje,
                aciertos,
                intentos: preguntas.length,
            })
            .then(() => setEstado('ok'))
            .catch(() => setEstado('error'));
        }
    }, [fin]);

    const repetir = () => {
        setPreguntas(generarPreguntas(actividad));
        setI(0);
        setAciertos(0);
        setEstado('');
    };

    if (fin) {
        return (
            <div className="tarjeta">
                <h2>{aciertos >= preguntas.length * 0.8 ? '🏆 Excelente' : '🌟 Buen trabajo'}</h2>
                <p className="grande">Puntaje: {puntaje} puntos ({aciertos} de {preguntas.length})</p>
                <p>{estado === 'ok' ? '✅ Partida guardada' : estado === 'error' ? ' ⚠️ No se pudo guardar la partida' : 'Guardando la partida...'}</p>
                <button className="btn" onClick={repetir}>🔄 Volver a jugar</button>
                <button className="btn gris" onClick={onSalir}>⬅ Menú</button>
            </div>
        );
    }

    return (
        <div className="tarjeta">
            <div className="barra">
                <span>{actividad.nombre}</span>
                <span className="puntos">⭐ {puntaje}</span>
            </div>
            <p>Pregunta {i + 1} de {preguntas.length}</p>
            <h2>{p.texto}</h2>
            <Escena e={p.escena} />
            <div>
                {p.opciones.map((op) => {
                    let clase = 'btn opcion';
                    if (elegida) {
                        if (op === p.correcta) clase += ' correcta';
                        else if (op === elegida) clase += 'incorrecta';
                    }
                    return (
                        <button key={op} className={clase} onClick={() => responder(op)}>
                            {FORMAS[op] || op}
                        </button>
                    );
                })}
            </div>
            <p className={elegida === p.correcta ? 'msg ok' : 'msg mal'}>
                {elegida && (elegida === p.correcta ? '🎉 Felicidades Bien hecho' : `😅 Casi lo logras, Era: ${p.correcta}`)}
            </p>
            <button className="btn gris" onClick={onSalir}>⬅ Salir</button>
        </div>
    );
}