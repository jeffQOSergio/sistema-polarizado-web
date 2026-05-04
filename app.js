const URL = "https://TU-LINK-RENDER.onrender.com";

async function login() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();

    if (res.ok) {
  document.getElementById("mensaje").style.color = "green";
  document.getElementById("mensaje").innerText = "✔ Login correcto";

  // ⬇️ ESTA ES LA CLAVE
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000); // espera 1 segundo
}

      // Aquí luego puedes redirigir
      // window.location.href = "dashboard.html";
    } else {
      document.getElementById("mensaje").innerText = data.message;
    }

  } catch (error) {
    document.getElementById("mensaje").innerText = "Error de conexión";
  }
}
