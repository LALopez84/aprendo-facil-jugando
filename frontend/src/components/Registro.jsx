import { useState } from "react";
import { crearEstudiante } from "../api";

export default function Registro({ onListo, onVolver }) {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [error, setError] = useState('');

    const enviar = async () => {
        const nombreLimpio = nombre.trim();
        const edadNum = Number(edad);

        if (!nombreLimpio) return setError('Escribe tu nombre');
        if (!edad) return setError('Escribe tu Edad');
        if (!Number.isInteger(edadNum) || edadNum < 3 || edadNum > 12) {
            return setError('El rango de edad debe ser de 3 a 12 años');
        }

        setError('');
        try {
            const est = await crearEstudiante({ nombre: nombreLimpio, edad: edadNum});
            onListo(est);
        } catch {
            setError('No se obtuvo conexión. Favor de intentar nuevamente');
        }
    };

    const alPulsarTecla = (e) => {
        if (e.key === 'Enter') enviar();
    };

    return (
        <div className="tarjeta">
            <h2>🎮 ¡Hola Gamer! 🎮</h2>
            <p className="subtitulo">Indica tu nombre y tu edad</p>
            <input className="campo" placeholder="Mi nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} onKeyDown={alPulsarTecla} />
            <input className="campo" type="number" min="3" max="12" placeholder="Mi edad" value={edad} onChange={(e) => setEdad(e.target.value)} onKeyDown={alPulsarTecla} />
            {error && <p className="error">{error}</p>}
            <div>
                <button className="btn" onClick={enviar}>Iniciar 🚀</button>
                <button className="btn gris" onClick={onVolver}>⬅ Volver</button>
            </div>
        </div>
    );
}