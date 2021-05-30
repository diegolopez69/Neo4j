const Router = require("express").Router;
const router = new Router();

const GrafoController = require("./../controllers/grafoController");

router.get("/", GrafoController.list);

module.exports = router;
