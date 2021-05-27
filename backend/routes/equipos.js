const Router = require('express').Router
const router = new Router();

const EquiposController = require('./../controllers/equiposController');

router.post('/add',EquiposController.add);
router.post('/delete',EquiposController.delete);
router.get('/get',EquiposController.get);

module.exports = router;