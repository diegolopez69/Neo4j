const Router = require("express").Router;
const router = new Router();

const CompeticionesController = require("./../controllers/competicionesController");

router.post("/add", CompeticionesController.add);
router.post("/equipo/add", CompeticionesController.addEquipo);
router.post("/delete", CompeticionesController.delete);
router.get("/get", CompeticionesController.get);

module.exports = router;