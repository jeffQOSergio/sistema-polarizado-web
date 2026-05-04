require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 🔗 CONEXIÓN MYSQL (Railway)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.log("❌ Error DB:", err);
  } else {
    console.log("✅ Conectado a MySQL 🚀");
  }
});


// 🔐 RF-01 LOGIN
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";

  db.query(sql, [usuario, password], (err, results) => {
    if (err) {
      return res.status(500).send("Error servidor");
    }

    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false });
    }
  });
});


// 👤 RF-02 REGISTRAR CLIENTE
app.post("/clientes", (req, res) => {
  const { nombre, telefono, placa } = req.body;

  const sql = "INSERT INTO clientes (nombre, telefono, placa) VALUES (?, ?, ?)";

  db.query(sql, [nombre, telefono, placa], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Cliente registrado correctamente" });
  });
});


// PRUEBA
app.get("/", (req, res) => {
  res.send("Sistema Polarizado funcionando 🚗");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
