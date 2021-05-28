const Router = require("express").Router;
const router = new Router();

const loginRoutes = require("./login");
const equiposRoutes = require("./equipos");
const jugadoresRoutes = require("./jugadores");
const competicionesRoutes = require("./competiciones");
const usuariosRoutes = require("./usuarios");

router.use("/login", loginRoutes);
router.use("/competicion", competicionesRoutes);
router.use("/equipo", equiposRoutes);
router.use("/jugador", jugadoresRoutes);
router.use("/usuario", usuariosRoutes);

module.exports = router;
