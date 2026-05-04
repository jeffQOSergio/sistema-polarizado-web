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
app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1 AND password = $2",
      [usuario, password]
    );

    if (result.rows.length > 0) {
      res.json({ message: "Login correcto" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
