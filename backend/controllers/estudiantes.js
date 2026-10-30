const db = require('../config/db');

exports.crear = async (req, res) => {
    const { nombre, edad } = req.body;
    const edadNum = Number(edad);
    if (!nombre || !nombre.trim() || !Number.isInteger(edadNum) || edadNum < 3 || edadNum > 12) {
    return res.status(400).json({ error: 'Escribe un nombre y una edad entre 3 y 12 años' });
    }
    const limpio = nombre.trim();
    const [existe] = await db.query(
        'SELECT id FROM estudiantes WHERE LOWER(nombre) = LOWER(?) AND edad = ? LIMIT 1', [limpio, edadNum]
    );
    if (existe.length > 0) {
        return res.json({ id: existe[0].id, nombre: limpio, edad: edadNum });
    }
    const [r] = await db.query('INSERT INTO estudiantes (nombre, edad) VALUES (?, ?)', [limpio, edadNum]);
    res.status(201).json({ id: r.insertId, nombre: limpio, edad: edadNum });
};

exports.listar = async (req, res) => {
  const soloConProgreso = req.query.conProgreso === 'true';
  const sql = soloConProgreso
    ? `SELECT e.* FROM estudiantes e
       WHERE EXISTS (SELECT 1 FROM progreso p WHERE p.estudiante_id = e.id)
       ORDER BY e.nombre, e.id`
    : 'SELECT * FROM estudiantes ORDER BY nombre';
  const [rows] = await db.query(sql);
  res.json(rows);
};