const URL = "https://sistema-polarizado-web.onrender.com";

// Navegación
function mostrar(seccion) {
  document.querySelectorAll(".seccion").forEach(div => {
    div.style.display = "none";
  });

  document.getElementById(seccion).style.display = "block";
}

// Logout
function logout() {
  window.location.href = "index.html";
}

// 🔥 RF-02 REGISTRAR CLIENTE (FORMA CORRECTA CON FORM)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCliente");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

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

        document.getElementById("mensaje").innerText = data.message;

        // limpiar inputs
        form.reset();

      } catch (error) {
        document.getElementById("mensaje").innerText = "Error al registrar cliente";
      }
    });
  }
});
