const configDB = require("../configDatabase");

// POST
exports.guardarTurno = async (req, res) => {
  const conneccion = await configDB;
  try {
    const [crearTurno] = await conneccion.execute(
      `call bd_monitoreo.sp_crear_turno('${req.body.nombre}','${req.body.area}','${req.body.telefono}',
      '${req.body.correo}','${req.body.turno}')  `
    );

    res.json(crearTurno);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error" + error);
  }
};
