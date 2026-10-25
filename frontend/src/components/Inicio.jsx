export default function Inicio({ onEstudiante, onDocente }) {
    return (
        <div className="tarjeta">
            <h2>🎮 ¡Bienvenido! 🎮</h2>
            <p className="subtitulo">¿Quién eres?</p>
            <button className="btn azul rol" onClick={onEstudiante}>🧒 Soy estudiante</button>
            <button className="btn morado rol" onClick={onDocente}>👩‍🏫 Soy docente</button>
        </div>
    );
}