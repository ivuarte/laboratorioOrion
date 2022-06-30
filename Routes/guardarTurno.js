const express = require("express");
const router = express.Router();
const creacionTurnoController = require("../controller/guardarTurno");

router.post("/", creacionTurnoController.guardarTurno);

module.exports = router;
