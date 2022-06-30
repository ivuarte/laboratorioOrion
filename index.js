const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Crear el servidor
const app = express();

//Habilitar cors
app.use(cors());

//Permitir leer datos que el usuario coloque
app.use(express.json({ extended: true }));

//importar rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/respuesta", require("./routes/respuesta"));
app.use("/api/agregar", require("./routes/guardarTurno"));
app.use("/api/turnos", require("./routes/listTurnos"));
app.use("/api/liberar", require("./routes/liberarTurno"));
app.use("/api/especialistas", require("./routes/listEspecialista"));
app.use("/api/agregarEspecialista", require("./routes/agregarEspecialista"));

//Puerto de la app y escucha
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
