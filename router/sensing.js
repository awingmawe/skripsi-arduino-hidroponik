const router = require("express").Router();
const controllerSensing = require("../controller/controllerSensing");

router.get("/", controllerSensing.getAllSensing);

module.exports = router;
