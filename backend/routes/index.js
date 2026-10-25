const router = require('express').Router();
const estudiantes = require('../controllers/estudiantes');
const actividades = require('../controllers/actividades');
const progreso = require('../controllers/progreso');

router.post('/estudiantes', estudiantes.crear);
router.get('/estudiantes', estudiantes.listar);
router.get('/actividades', actividades.listar);
router.post('/progreso', progreso.guardar);
router.get('/progreso', progreso.listar);

module.exports = router;