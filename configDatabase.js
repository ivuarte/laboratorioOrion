const mysql = require("mysql2/promise");
require("dotenv").config({ path: "vars.env" });

 
 const connection =  mysql.createConnection({
    
    host:  process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:  process.env.DATABASE,
    connectionLimit:   process.env.CONNECTIONLIMIT
  });


module.exports = connection