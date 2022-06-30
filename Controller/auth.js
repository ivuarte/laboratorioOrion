const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const  configDB = require("../configDatabase")

// POST
exports.autenticarUsuario = async (req, res) => {
  const { user, password } = req.body;

  function buscarUsuario(listaUsuarios) {
    let usuario;
    for (let i = 0; i < listaUsuarios.length; i++) {
      if (listaUsuarios[i].usuario === user) {
        usuario = listaUsuarios[i];
      }
    }
    return usuario;
  }
  function validarPassword(usuario) {
    let valido;
    if (usuario.password === password) {
      valido = true;
    }
    return valido;
  }
  const conneccion = await configDB

  try {
    //  console.time("Measuring Time");
    const [v_usuarios_app] = await conneccion.execute(
      `SELECT * FROM bd_monitoreo.v_usuarios_app_yeapdo`
    );

    //Reviso que el usuario exista
    let usuario = await buscarUsuario(v_usuarios_app);
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    //console.log(usuario);

    //Reviso que el password sea correcto
    const passCorrecto = await validarPassword(usuario);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }
    //console.log(passCorrecto);

    //Si el usuario y el password ingresados son correctos, usamos JWT que encapsulara la data del usuario que deseemos, como el id, que luego nos servira para el GET de los datos del usuario excluyendo al password por seguridad
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          res.json({ token: token });
        }
      }
    );
    
    //console.timeEnd("Measuring Time");
  } catch (error) {
    console.log(error);
  }
};

// GET
exports.usuarioAutenticado = async (req, res) => {
  function esconderPassword(listaUserID) {
    let usuario;
    if (listaUserID.length > 0) {
      usuario = {
        id: listaUserID[0].id,
        user: listaUserID[0].usuario,
        rol: listaUserID[0].rol,
        nombres: listaUserID[0].nombres,
        email: listaUserID[0].email,
      };
    }
  //  console.log(usuario)
    return usuario;
  }
  const conneccion = await configDB
  try {
    const [userID] = await conneccion.query(
      `SELECT * FROM bd_monitoreo.tb_usuarios_app_yeapdo where id = ${req.usuario.id}`
    );
    const usuario = await esconderPassword(userID);

    //console.log(usuario);
    res.json(usuario);
    
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
