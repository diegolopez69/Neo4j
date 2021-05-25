const Router = require('express').Router
const router = new Router();

const loginController = require('./../controllers/loginController');

router.post('/usuario',loginController.addUsuario);
router.post('/contra',loginController.addContraseña);
router.post('/usuario/contra',loginController.addUsuarioContraseña);

module.exports = router;