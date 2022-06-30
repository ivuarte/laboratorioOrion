const express = require("express");
const router = express.Router();
const especialitsController = require("../controller/listEspecialista");

router.get("/", especialitsController.listarEspecialista);

module.exports = router;
