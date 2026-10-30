const API = import.meta.env.VITE_API_URL;

const pedir = async (ruta, opciones) => {
    const r = await fetch(API + ruta, opciones);
    if (!r.ok) throw new Error('Error de servidor');
    return r.json();
};

const post = (ruta, datos) =>
    pedir(ruta, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
    });

    export const crearEstudiante = (datos) => post('/estudiantes', datos);
    export const getEstudiantes = (soloConProgreso = false) => pedir(`/estudiantes${soloConProgreso ? '?conProgreso=true' : ''}`);
    export const getActividades = (nivel) => pedir(`/actividades?nivel=${nivel}`);
    export const guardarProgreso = (datos) => post('/progreso', datos);
    export const getProgreso = (estudianteId = '') => pedir(`/progreso${estudianteId ? `?estudiante_id=${estudianteId}` : ''}`);






