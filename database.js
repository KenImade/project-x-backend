const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);

console.log("Connected to PLANETSCALE")

module.exports = connection;