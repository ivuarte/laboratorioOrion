const configDB = require("../configDatabase");

// POST
exports.guardarEspecialista = async (req, res) => {
  const conneccion = await configDB;
  try {
    const [crearEspecialista] = await conneccion.execute(
      `call bd_monitoreo.sp_crear_especialista('${req.body.nombre}')  `
    );

    res.json(crearEspecialista);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error" + error);
  }
};
