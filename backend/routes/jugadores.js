const Router = require('express').Router
const router = new Router();

const JugadoresController = require('./../controllers/jugadoresController');

router.post('/add',JugadoresController.add);
router.post('/equipo/add',JugadoresController.addEquipo);


module.exports = router;