const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementsByName("form_suscripcion")[0]; 

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* Obtiene los valores del formulario */
    const name = document.getElementById("nombre").value.trim();
    const lastName = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();

    /*  Validar los campos */
    const isvalidate = validarFormulario(name, lastName, email);
   if(isvalidate.valido) send_suscription(name, lastName, email);

   
  });
});


function validarFormulario(name, lastName, email) {
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // Solo letras y espacios
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de email válido
  
  if(!name || !lastName || !email){
    message = "Todos los campos son obligatorios"
    show_toast('error', message);
    return { valido: false, message: message };
  }
  if (!nameRegex.test(name)) {
    message = "El nombre debe contener solo letras"
    show_toast('error', message);
    return { valido: false, message: message };
  }

  if (!nameRegex.test(lastName)) {
    message = "El apellido debe contener solo letras"
    show_toast('error', message);
    return { valido: false, message: message };
  }
  
  if (!emailRegex.test(email)) {
    message = "El Email no es válido"
    show_toast('error', message);
    return { valido: false, message: message };
  }
  
  return { valido: true, mensaje: "Formulario válido" };
}


async function send_suscription(name, lastName, email) {
  try {
    const response = await fetch(
      "https://hormitech-production.up.railway.app/api/v1/newsletters",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ name, lastName, email }),
      }
    );
    /* Verifica que el email ya esta suscrito  */
    if(response.status===409){
      show_toast('info', ` ${email} ya se encuentra suscrito` );
      return;
    }
     /* Verificar si la respuesta es exitosa */
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    
    const data = await response.json();
    console.log(data)
    show_toast('success', `Se ha suscrito correctamente el correo ${email} 👍`); 

  } catch (error) {
    console.error(error);
    show_toast('error', `Error al suscribirse` );
  }
}

function show_toast(icon, title){
  Toast.fire({
    icon: icon,
    title: title
  });
}