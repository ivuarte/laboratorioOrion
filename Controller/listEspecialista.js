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
    });
  }
  return arrayFomat;
}

// GET
exports.listarEspecialista = async (req, res) => {
  const conneccion = await configDB;
  try {
    const [listaEspecialista] = await conneccion.query(
      `SELECT * FROM bd_monitoreo.v_especialistas`
    );
   // console.log(formatfecha(listaEspecialista));
    res.json(formatfecha(listaEspecialista));
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error" + error);
  }
};
