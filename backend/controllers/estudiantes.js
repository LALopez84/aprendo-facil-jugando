const db = require('../config/db');

exports.crear = async (req, res) => {
    const { nombre, edad } = req.body;
    const edadNum = Number(edad);

    if (!nombre || !nombre.trim() || !Number.isInteger(edadNum) || edadNum < 3 || edadNum > 12) {
        return res.status(400).json({ error: 'Escribe tu nombre y edad ( de 3 a 12 años )' });
    }

    const [r] = await db.query(
        ' INSERT INTO estudiantes (nombre, edad) VALUES (?, ?)', [nombre.trim(), edadNum]
    );

    res.status(201).json({ id: r.insertId, nombre: nombre.trim(), edad: edadNum });
};    

exports.listar = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM estudiantes ORDER BY nombre');
    res.json(rows);
};