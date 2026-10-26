require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ nombre: 'API Aprendo Fácil Jugando', estado: 'en línea', actividades: '/api/actividades' });
});
app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
});

app.listen(process.env.PORT, () =>
    console.log(`API lista en http://localhost:${process.env.PORT}`)
);