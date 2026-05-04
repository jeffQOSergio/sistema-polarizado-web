require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 🔗 CONEXIÓN MYSQL (Railway - PUBLIC URL)
const db = mysql.createConnection({
  uri: process.env.MYSQL_URL,
  multipleStatements: true
});

db.connect(err => {
  if (err) {
    console.log("❌ Error DB:", err);
  } else {
    console.log("✅ Conectado a MySQL 🚀");
  }
});

// 🔐 LOGIN (RF-01)
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ success: false, message: "Campos vacíos" });
  }

  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";

  db.query(sql, [usuario, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }

    if (results.length > 0) {
      res.json({ success: true, message: "Login correcto" });
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  });
});

// 👤 REGISTRAR CLIENTE (RF-02)
app.post("/clientes", (req, res) => {
  const { nombre, telefono, placa } = req.body;

  if (!nombre || !telefono || !placa) {
    return res.status(400).json({ message: "Campos incompletos" });
  }

  const sql = "INSERT INTO clientes (nombre, telefono, placa) VALUES (?, ?, ?)";

  db.query(sql, [nombre, telefono, placa], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error al registrar cliente" });
    }

    res.json({ message: "Cliente registrado correctamente" });
  });
});

// 🟢 TEST
app.get("/", (req, res) => {
  res.send("Sistema Polarizado funcionando 🚗");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
