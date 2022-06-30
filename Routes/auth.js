const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const auth = require("../middleware/auth");

// Autenticar usuario => api/auth
router.post("/", authController.autenticarUsuario);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
