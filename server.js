require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// 👇 ESTO ES CLAVE (sirve HTML)
app.use(express.static(__dirname));
// conexión a Railway (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
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
app.post("/clientes", async (req, res) => {
  const { nombre, telefono, placa } = req.body;

  try {
    await pool.query(
      "INSERT INTO clientes (nombre, telefono, placa) VALUES ($1, $2, $3)",
      [nombre, telefono, placa]
    );

    res.json({ message: "Cliente registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// prueba
app.get("/", (req, res) => {
  res.send("Sistema Polarizado funcionando 🚗");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.log("Error DB:", err);
  } else {
    console.log("Conectado a MySQL 🚀");
  }
});
