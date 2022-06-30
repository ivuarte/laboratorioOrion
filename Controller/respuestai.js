const axios = require("axios").default;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const mysql = require("mysql2/promise");
const configDB = require("../configDatabase");

exports.listarResponsableEventos = async (req, res) => {
  const conneccion = await configDB;
  try {
    const [listaTurnos] = await conneccion.query(
      `SELECT * FROM bd_monitoreo.turnos WHERE disponibilidad = 'SI'`
    );
      console.log(req.body);
      for (let i = 0; i < listaTurnos.length; i++) {
        if (listaTurnos[i].area === "Especialista Servidor" && req.body.ambiente === 'SYSTEM TP') {
          //console.log(listaTurnos)
          const generateAlarm = await axios.post(
            "https://y2contact.trunkall.com:8443/trunkall/v1/do/receive-ticket",
            {
              ticket: req.body.ticket, //xabix
              idAlert: req.body.idAlert,
              contactCall: listaTurnos[0].nombre,
              url: "http://186.154.213.76:1433/",
              message:  req.body.message, //quemado
              notifications: [
                {
                  channel: "email",
                  destinations: [listaTurnos[i].correo],
                },
                {
                  channel: "tts",
                  destinations: [`57${listaTurnos[0].telefono}`],
                },
                {
                  channel: "whatsapp",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
                {
                  channel: "call",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
                {
                  channel: "sms",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
              ],
            }
          );
        }  if (listaTurnos[i].area === "Especialista Telefonia" && req.body.ambiente === 'ACD TP') {
          //console.log(listaTurnos)
          const generateAlarm = await axios.post(
            "https://y2contact.trunkall.com:8443/trunkall/v1/do/receive-ticket",
            {
              ticket: req.body.ticket, //xabix
              idAlert: req.body.idAlert,
              contactCall: listaTurnos[0].nombre,
              url: "http://186.154.213.76:1433/",
              message:  req.body.message, //quemado
              notifications: [
                {
                  channel: "email",
                  destinations: [listaTurnos[i].correo],
                },
                {
                  channel: "tts",
                  destinations: [`57${listaTurnos[0].telefono}`],
                },
                {
                  channel: "whatsapp",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
                {
                  channel: "call",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
                {
                  channel: "sms",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
              ],
            }
          );
        } if (listaTurnos[i].area === "Especialista App" && req.body.ambiente === 'APLICACIONES TPC') {
          //console.log(listaTurnos)
          const generateAlarm = await axios.post(
            "https://y2contact.trunkall.com:8443/trunkall/v1/do/receive-ticket",
            {
              ticket: req.body.ticket, //xabix
              idAlert: req.body.idAlert,
              contactCall: listaTurnos[0].nombre,
              url: "http://186.154.213.76:1433/",
              message:  req.body.message, //quemado
              notifications: [
                {
                  channel: "email",
                  destinations: [listaTurnos[i].correo],
                },
                {
                  channel: "tts",
                  destinations: [`57${listaTurnos[0].telefono}`],
                },
                {
                  channel: "whatsapp",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
                {
                  channel: "call",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
                {
                  channel: "sms",
                  destinations: [`57${listaTurnos[i].telefono}`],
                },
              ],
            }
          );
        }
        
        else {
            await axios.post(
              "https://y2contact.trunkall.com:8443/trunkall/v1/do/receive-ticket",
              {
                ticket: req.body.ticket, //xabix
                idAlert: req.body.idAlert,
                contactCall: listaTurnos[0].nombre,
                url: "http://186.154.213.76:1433/",
                message:  req.body.message, //quemado
                notifications: [
                  {
                    channel: "email",
                    destinations: [listaTurnos[i].correo],
                  },
                  {
                    channel: "sms",
                    destinations: [`57${listaTurnos[i].telefono}`],
                  },
                ],
              }
            );
          }
        }

      //  console.log(listaTurnos[0].telefono);
    

    res.json("Ejecucion correcta del backend");
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};