const Router = require('express').Router
const router = new Router();

const equiposRoutes = require('./equipos');
const jugadoresRoutes = require('./jugadores');
const competicionesRoutes = require('./competiciones');

router.use('/equipo',equiposRoutes);
router.use('/jugadore',jugadoresRoutes);
router.use('/competicion',competicionesRoutes);


module.exports = router;