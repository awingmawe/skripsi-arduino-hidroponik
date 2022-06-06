const router = require("express").Router();
const controllerSensing = require("../controller/controllerSensing");

router.get("/", controllerSensing.getAllSensing);
router.get("/sensingNode", controllerSensing.getAllSensingNode);
router.get("/phAir", controllerSensing.getPhAir);
router.get("/real-time-phAir", controllerSensing.getSensingPhAir);
router.get("/suhuAir", controllerSensing.getSuhuAir);
router.get("/real-time-suhuAir", controllerSensing.getSensingSuhuAir);
router.get("/humidity", controllerSensing.getHumidity);
router.get("/real-time-humidity", controllerSensing.getSensingHumidity);
router.get("/suhuUdara", controllerSensing.getSuhuUdara);
router.get("/real-time-suhuUdara", controllerSensing.getSensingSuhuUdara);
router.get("/kelarutan", controllerSensing.getKelarutan);
router.get("/real-time-kelarutan", controllerSensing.getSensingKelarutan);

module.exports = router;
