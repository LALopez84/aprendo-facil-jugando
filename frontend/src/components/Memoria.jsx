import { useEffect, useState } from "react";
import { guardarProgreso } from "../api";

const EMOJIS = ['🐶', '🐱', '🐸', '🦁', '🐼', '🐵'];
const nuevoMazo = () =>
    [...EMOJIS, ...EMOJIS].sort (() => Math.random() - 0.5).map((e, id) => ({ id, e }));

export default function Memoria({ estudiante, actividad, onSalir}) {
    const [mazo, setMazo] = useState(nuevoMazo);
    const [abiertas, setAbiertas] = useState([]);
    const [halladas, setHalladas] = useState([]);
    const [movimientos, setMovimientos] = useState(0);
    const [estado, setEstado] = useState('');

    const parejas = halladas.length /2;
    const puntaje = parejas * 10;
    const fin = parejas === EMOJIS.length;

    const voltear = (c) => {
        if (abiertas.length === 2 || abiertas.includes(c.id) || halladas.includes(c.id)) return;
        const nuevas = [...abiertas, c.id];
        setAbiertas(nuevas);
        if (nuevas.length === 2) {
            setMovimientos((m) => m + 1);
            const [a, b] = nuevas.map((id) => mazo.find((x) => x.id ===id));
            if (a.e === b.e) {
                setHalladas((h) => [...h, a.id, b.id]);
                setAbiertas([]);
            } else {
                setTimeout(() => setAbiertas([]), 900);
            }
        }
    };

    useEffect(() => {
        if (fin) {
            guardarProgreso({
                estudiante_id: estudiante.id,
                actividad_id: actividad.id,
                puntaje,
                aciertos: parejas,
                intentos: movimientos,
            })
            .then(() => setEstado('ok'))
            .catch(() => setEstado('error'));
        }
    }, [fin]);

    const reiniciar = () => {
        setMazo(nuevoMazo());
        setAbiertas([]);
        setHalladas([]);
        setMovimientos(0);
        setEstado('');
    };

    return (
        <div className="tarjeta">
            <div className="barra">
                <span>{actividad.nombre}</span>
                <span className="puntos">⭐ {puntaje}</span>
            </div>
            <p>Movimientos: {movimientos}</p>
            {fin ? (
                <>
                <h2>🏆 Felicidades has encontrado todas las parejas</h2>
                <p>{estado === 'ok' ? '✅ Progreso guardado' : estado === 'error' ? '⚠️ La Partida no se pudo guardar' : 'Guardando la partida...'}</p>
                <button className="btn" onClick={reiniciar}>🔄 Volver a empezar</button>
                </>
            ) : (
                <div className="tablero">
                    {mazo.map((c) => {
                        const visible = abiertas.includes(c.id) || halladas.includes(c.id);
                        const clase = halladas.includes(c.id) ? 'hallada' : visible ? 'abierta' : '';
                        return (
                            <button key={c.id} className={`carta ${clase}`} onClick={() => voltear(c)}> {visible ? c.e : '❓'}</button>
                        );
                    })}
                </div>
            )}
            <button className="btn gris" onClick={onSalir}>⬅ Salir</button>
        </div>
    );
}