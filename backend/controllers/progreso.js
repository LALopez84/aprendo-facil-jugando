const db = require('../config/db');

exports.guardar = async (req, res) => {
  const { estudiante_id, actividad_id, puntaje, aciertos, intentos } = req.body;
  const valores = [estudiante_id, actividad_id, puntaje, aciertos, intentos];

  if (valores.some((n) => n === undefined || n === null || !Number.isInteger(Number(n)) || Number(n) < 0)) {
    return res.status(400).json({ error: 'Datos de progreso inválidos' });
  }

  await db.query(
    'INSERT INTO progreso (estudiante_id, actividad_id, puntaje, aciertos, intentos) VALUES (?, ?, ?, ?, ?)',
    valores
  );
  res.status(201).json({ mensaje: 'Progreso guardado' });
};

exports.listar = async (req, res) => {
  const { estudiante_id } = req.query;
  let sql = `SELECT p.id, e.nombre AS estudiante, a.nombre AS actividad,
             p.puntaje, p.aciertos, p.intentos, p.fecha
             FROM progreso p
             JOIN estudiantes e ON e.id = p.estudiante_id
             JOIN actividades a ON a.id = p.actividad_id`;
  const params = [];
  if (estudiante_id) {
    sql += ' WHERE p.estudiante_id = ?';
    params.push(estudiante_id);
  }
  sql += ' ORDER BY p.fecha DESC';
  const [rows] = await db.query(sql, params);
  res.json(rows);
};