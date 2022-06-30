const mysql = require("mysql2/promise");
const dayjs = require("dayjs");
const configDB = require("../configDatabase");

function formatfecha(arraytUnformat) {
  let arrayFomat = [];
  for (let i = 0; i < arraytUnformat.length; i++) {
    arrayFomat.push({
      ...arraytUnformat[i],
      id: parseInt(arraytUnformat[i].id),
      fecha: dayjs(arraytUnformat[i].fecha).format("DD-MM-YYYY  HH:mm:ss"),
      hora_salida: dayjs(arraytUnformat[i].hora_salida).format(
        "DD-MM-YYYY  HH:mm:ss"
      ),
    });
  }
  return arrayFomat;
}

// GET
exports.listarTurnos = async (req, res) => {
  const conneccion = await configDB;
  try {
    const [listaTurnos] = await conneccion.query(
      `SELECT * FROM bd_monitoreo.consulta_salida_turno`
    );

  
    res.json(formatfecha(listaTurnos));
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error" + error);
  }
};

exports.editarTurnoPorId = async (req, res) => {
  const conneccion = await configDB;
  try {
    const [usuario] = await conneccion.query(
      `UPDATE  bd_monitoreo.turnos SET 
      nombre = '${req.body.nombre}',
      correo = '${req.body.correo}',
      telefono = '${req.body.telefono}',
      area = '${req.body.area}'
      WHERE 
      (id = '${req.params.id}');`
    );

    res.json("usuario gestionado con exito");
  } catch (error) {
    console.log(error.response);
    res.status(500).send("Hubo un error" + error);
  }
};
exports.borrarTurnoPorId = async (req, res) => {
  const conneccion = await configDB;
  //console.log(req.params.id);
  try {
    const [usuario] = await conneccion.query(
      `DELETE from  bd_monitoreo.turnos  WHERE  id = '${req.params.id}';`
    );

    res.json("usuario ELIMINADO con exito");
  } catch (error) {
    // console.log(error.response);
    res.status(500).send("Hubo un error" + error);
  }
};
