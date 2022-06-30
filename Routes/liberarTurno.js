const express = require("express");
const router = express.Router();
const liberarController = require("../controller/liberarTurno");

router.put("/", liberarController.liberarTurno);

module.exports = router;
