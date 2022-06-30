const express = require("express");
const router = express.Router();
const listarResponsableEventos = require("../Controller/respuestai");

router.post("/", listarResponsableEventos.listarResponsableEventos);

module.exports = router;
