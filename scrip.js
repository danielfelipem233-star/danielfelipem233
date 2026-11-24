// Variables globales (equivalentes a las de tu script en Python)
let nombre = "";
let apellido = "";
let edad = "";
let cedula = "";
let usuario = "";
let clave = "";
let intentos = 0;
let aprobados = 0;
let reprobados = 0;

// Referencias a los elementos del HTML
const formRegistro = document.getElementById("form-registro");
const seccionConfirmacion = document.getElementById("seccion-confirmacion");
const formNotas = document.getElementById("form-notas");
const seccionResultado = document.getElementById("seccion-resultado");

// PASO 1: Capturar datos iniciales y generar usuario
formRegistro.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    nombre = document.getElementById("nombre").value.trim();
    apellido = document.getElementById("apellido").value.trim();
    edad = document.getElementById("edad").value.trim();
    cedula = document.getElementById("cedula").value.trim();
    clave = document.getElementById("clave").value;

    // Lógica: usuario = edad + nombre + apellido
    usuario = edad + nombre + apellido;

    // Mostrar usuario generado y pasar a confirmar clave
    document.getElementById("usuario-generado").textContent = usuario;
    formRegistro.classList.add("oculto");
    seccionConfirmacion.classList.remove("oculto");
});

// PASO 2: Confirmación de clave con máximo 3 intentos
document.getElementById("btn-confirmar").addEventListener("click", function() {
    const claveConfirmacion = document.getElementById("clave-confirmacion").value;
    const mensajeClave = document.getElementById("mensaje-clave");

    if (claveConfirmacion === clave) {
        mensajeClave.textContent = "Clave confirmada correctamente.";
        mensajeClave.className = "mensaje exito";

        // Pasar al formulario de notas después de 1 segundo
        setTimeout(() => {
            seccionConfirmacion.classList.add("oculto");
            formNotas.classList.remove("oculto");
        }, 1000);
    } else {
        intentos += 1;
        
        if (intentos >= 3) {
            mensajeClave.textContent = "Has excedido el número máximo de intentos.";
            mensajeClave.className = "mensaje error";
            document.getElementById("btn-confirmar").disabled = true;
            document.getElementById("clave-confirmacion").disabled = true;
        } else {
            mensajeClave.textContent = `Las claves no coinciden. Intenta nuevamente. (Intento ${intentos}/3)`;
            mensajeClave.className = "mensaje error";
            document.getElementById("clave-confirmacion").value = "";
        }
    }
});

// PASO 3: Ingresar las 5 notas y calcular promedio
formNotas.addEventListener("submit", function(event) {
    event.preventDefault();

    // Crear lista (array) de notas
    let notas = [];
    notas.push(parseFloat(document.getElementById("nota1").value));
    notas.push(parseFloat(document.getElementById("nota2").value));
    notas.push(parseFloat(document.getElementById("nota3").value));
    notas.push(parseFloat(document.getElementById("nota4").value));
    notas.push(parseFloat(document.getElementById("nota5").value));

    // Calcular suma y promedio
    let suma = notas.reduce((acumulador, notaActual) => acumulador + notaActual, 0);
    let promedio = suma / notas.length;

    // Evaluar si aprobó (>= 3.5)
    let aprobo = promedio >= 3.5;
    const mensajeFinal = document.getElementById("mensaje-final");

    if (aprobo) {
        mensajeFinal.textContent = `Felicidades ${nombre} ${apellido}, has aprobado con un promedio de ${promedio.toFixed(2)}.`;
        mensajeFinal.className = "aprobado-box";
        aprobados += 1;
    } else {
        mensajeFinal.textContent = `Lo siento ${nombre} ${apellido}, no has aprobado. Tu promedio es de ${promedio.toFixed(2)}.`;
        mensajeFinal.className = "reprobado-box";
        reprobados += 1;
    }

    // Actualizar contadores en pantalla
    document.getElementById("contador-aprobados").textContent = aprobados;
    document.getElementById("contador-reprobados").textContent = reprobados;

    // Mostrar sección final
    formNotas.classList.add("oculto");
    seccionResultado.classList.remove("oculto");
});

// EXTRA: Botón para registrar otro estudiante manteniendo los contadores
document.getElementById("btn-reiniciar").addEventListener("click", function() {
    intentos = 0;
    formRegistro.reset();
    formNotas.reset();
    document.getElementById("clave-confirmacion").value = "";
    document.getElementById("mensaje-clave").textContent = "";
    
    seccionResultado.classList.add("oculto");
    formRegistro.classList.remove("oculto");
});