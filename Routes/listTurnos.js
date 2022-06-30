const express = require("express");
const router = express.Router();
const turnosController = require("../controller/listTurnos");

router.get("/", turnosController.listarTurnos);
router.put("/:id", turnosController.editarTurnoPorId);
router.delete("/:id", turnosController.borrarTurnoPorId);

module.exports = router;
