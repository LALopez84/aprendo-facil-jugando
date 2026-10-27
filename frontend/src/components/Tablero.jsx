import { useEffect, useState } from "react";
import { getEstudiantes, getProgreso } from "../api";

export default function Tablero({ onSalir }) {
    const [estudiante, setEstudiante] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [filas, setFilas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getEstudiantes()
        .then(setEstudiante)
        .catch(() => setError('No se pudo cargar la lista de estudiantes'));
    }, []);

    useEffect(() => {
        setError('');
        getProgreso(filtro)
        .then(setFilas)
        .catch(() => setError('No se pudo cargar el progreso'));
    }, [filtro]);

    const total = filas.length;
    const promedio = total ? Math.round(filas.reduce((s, f) => s + f.puntaje, 0) / total) : 0;
    const mejor = total ? Math.max(...filas.map((f) => f.puntaje)) : 0;
    const fecha = (f) => new Date(f).toLocaleString('es-GT', { dataStyle: 'short', timeStyle: 'short' });

    return (
        <div className="tarjeta ancha">
            <h2>👩‍🏫 Tablero de docente</h2>
            <p className="subtitulo">Progreso de los estudiantes</p>

            <select className="campo" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                <option value="">Todos los estudiantes</option>
                {estudiante.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.nombre} · {e.edad} años · #{e.id}
                    </option>
                ))}
            </select>

            {error && <p className="error">{error}</p>}

            <div className="resumen">
                <div className="dato"><strong>{total}</strong>Partidas</div>
                <div className="dato"><strong>{promedio}</strong>Puntaje promedio</div>
                <div className="dato"><strong>{mejor}</strong>Mejor puntaje</div>
            </div>

            <div className="tabla-scroll">
                <table className="tabla-progreso">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Actividad</th>
                            <th>Puntaje</th>
                            <th>Aciertos</th>
                            <th>Intentos</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas.length === 0 ? (
                            <tr><td colSpan="6">Todavía no hay partidas gurdadas.</td></tr>
                        ) : (
                            filas.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.estudiante}</td>
                                    <td>{f.actividad}</td>
                                    <td>⭐{f.puntaje}</td>
                                    <td>{f.aciertos}</td>
                                    <td>{f.intentos}</td>
                                    <td>{fecha (f.fecha)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <button className="btn gris" onClick={onSalir}>⬅ Volver</button>
        </div>
    );
}