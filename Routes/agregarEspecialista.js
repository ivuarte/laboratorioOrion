const express = require("express");
const router = express.Router();
const creacionEspecialistaController = require("../controller/agregarEspecialista");

router.post("/", creacionEspecialistaController.guardarEspecialista);

module.exports = router;
