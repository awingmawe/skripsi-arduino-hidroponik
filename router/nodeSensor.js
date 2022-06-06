const router = require("express").Router();
const controllerNode = require("../controller/controllerNode");

router.get("/", controllerNode.getAllNode);

module.exports = router;
