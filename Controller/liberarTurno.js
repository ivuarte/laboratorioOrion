const configDB = require("../configDatabase");

// POST
exports.liberarTurno = async (req, res) => {
  const conneccion = await configDB;
  try {
    const [liberar_Turno] = await conneccion.execute(
      `call bd_monitoreo.sp_liberar_turno(); `
    );

    res.json(liberar_Turno);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error" + error);
  }
};
