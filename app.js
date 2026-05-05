const URL = "https://TU-LINK-RENDER.onrender.com";

async function login() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const loader = document.getElementById("loader");

  loader.style.display = "block";

  try {
    const res = await fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();

    loader.style.display = "none";

    if (data.success) {
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("mensaje").innerText = "Credenciales incorrectas";
    }

  } catch (error) {
    loader.style.display = "none";
    document.getElementById("mensaje").innerText = "Error conexión servidor";
  }
}
      // Aquí luego puedes redirigir
      // window.location.href = "dashboard.html";
    } else {
      document.getElementById("mensaje").innerText = data.message;
    alert("Credenciales incorrectas");
    }

  } catch (error) {
    document.getElementById("mensaje").innerText = "Error de conexión";
  }
}
