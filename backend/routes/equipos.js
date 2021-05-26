const Router = require('express').Router
const router = new Router();

const EquiposController = require('./../controllers/equiposController');

router.post('/add',EquiposController.add);
router.get('/buscar',EquiposController.buscar);
router.post('/borrar',EquiposController.borrar);

module.exports = router;