const Router = require('express').Router
const router = new Router();

const loginRoutes = require('./login');
const equiposRoutes = require('./equipos');
const jugadoresRoutes = require('./jugadores');
const competicionesRoutes = require('./competiciones');

router.use('/equipo',equiposRoutes);
router.use('/jugador',jugadoresRoutes);
router.use('/competicion',competicionesRoutes);
router.use('/login',loginRoutes);


module.exports = router;