const Router = require('express').Router
const router = new Router();

const loginController = require('./../controllers/loginController');

router.post('/usuario',loginController.addUsuario);
router.post('/contraseña',loginController.addContraseña);


module.exports = router;