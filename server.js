const express = require("express");
const dotenv = require("dotenv").config();
const mysql = require('mysql2');
const port = process.env.PORT || 5000;
const app = express();

// DB connection
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PLANETSCALE")


// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes


app.listen(port, () => console.log(`Server started on port ${port}`))