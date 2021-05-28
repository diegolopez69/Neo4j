const Router = require("express").Router;
const router = new Router();

const UsuariosController = require("./../controllers/usuariosController");

router.post("/add", UsuariosController.add);
router.get("/get", UsuariosController.get);
router.post("/delete", UsuariosController.delete);

module.exports = router;
