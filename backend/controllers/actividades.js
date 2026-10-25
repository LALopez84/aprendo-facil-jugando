const db = require('../config/db');

exports.listar = async (req, res) => {
    const { nivel } = req.query;
    const [rows] = nivel
    ? await db.query('SELECT * FROM actividades WHERE nivel = ?', [nivel])
    : await db.query('SELECT * FROM actividades');
    res.json(rows);
};