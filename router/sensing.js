const router = require("express").Router();
const controllerSensing = require("../controller/controllerSensing");

router.get("/", controllerSensing.getAllSensing);
router.get("/sensingNode", controllerSensing.getAllSensingNode);
router.get("/phAir", controllerSensing.getPhAir);
router.get("/suhuAir", controllerSensing.getSuhuAir);
router.get("/humidity", controllerSensing.getHumidity);

module.exports = router;
