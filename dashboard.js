const URL = "https://TU-LINK-RENDER.onrender.com";

function mostrar(seccion) {
  document.querySelectorAll(".seccion").forEach(div => {
    div.style.display = "none";
  });

  document.getElementById(seccion).style.display = "block";
}

function logout() {
  window.location.href = "index.html";
}

// REGISTRAR CLIENTE (RF-02)
async function registrarCliente() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const placa = document.getElementById("placa").value;

  try {
    const res = await fetch(URL + "/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, telefono, placa })
    });

    const data = await res.json();

    document.getElementById("msgCliente").innerText = data.message;

  } catch (error) {
    document.getElementById("msgCliente").innerText = "Error al registrar";
  }
}
