
/* =========================================
   1. BEBELUX 2.0: RECUPERACION DEL SISTEMA
   ========================================= */

const recoverButton = document.getElementById("recover-button");

recoverButton.addEventListener("click", function () {
    document.body.classList.add("recovered");

    console.log("Sistema recuperado correctamente.");
});


/* =========================================
   2. ELEMENTOS DEL CHATBOT
   ========================================= */

const chatToggle = document.getElementById("chat-toggle");
const chatPanel = document.getElementById("chat-panel");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

let rollInProgress = false;


/* =========================================
   3. ABRIR Y CERRAR EL CHATBOT
   ========================================= */

chatToggle.addEventListener("click", function () {
    const opening = chatPanel.hidden;

    chatPanel.hidden = !opening;

    chatToggle.setAttribute(
        "aria-expanded",
        String(opening)
    );

    if (opening) {
        chatInput.focus();
    }
});

chatClose.addEventListener("click", function () {
    chatPanel.hidden = true;

    chatToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    chatToggle.focus();
});


/* =========================================
   4. AGREGAR MENSAJES AL CHAT
   ========================================= */

function addMessage(text, sender) {
    const message = document.createElement("p");

    message.classList.add("chat-message");

    if (sender === "user") {
        message.classList.add("user-message");
    } else {
        message.classList.add("bot-message");
    }

    /* textContent evita interpretar el mensaje como HTML */
    message.textContent = text;

    chatMessages.appendChild(message);

    /* Mantener visible el mensaje más reciente */
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =========================================
   5. EASTER EGG: BARREL ROLL
   ========================================= */

function executeBarrelRoll() {
    if (rollInProgress) {
        addMessage(
            "¡Espera! El sistema todavía está girando.",
            "bot"
        );

        return;
    }

    const siteContent = document.getElementById("site-content");

    if (!siteContent) {
        addMessage(
            "No encuentro el contenido que debo hacer girar.",
            "bot"
        );

        return;
    }

    rollInProgress = true;

    addMessage(
        "¡Easter egg desbloqueado! ¡Agárrate, vamos a dar una vuelta!",
        "bot"
    );

    /* Eliminar una animación anterior */
    siteContent.classList.remove("barrel-roll");

    /* Forzar el reinicio de la animación */
    void siteContent.offsetWidth;

    /* Iniciar el giro inmediatamente */
    siteContent.classList.add("barrel-roll");

    /* Esperar a que termine la animación */
    function finishRoll(event) {
        if (event.animationName !== "barrel-roll") {
            return;
        }

        siteContent.classList.remove("barrel-roll");

        siteContent.removeEventListener(
            "animationend",
            finishRoll
        );

        rollInProgress = false;

        addMessage(
            "¡Giro completado! El sistema sigue operativo.",
            "bot"
        );
    }

    siteContent.addEventListener(
        "animationend",
        finishRoll
    );
}


/* =========================================
   6. NORMALIZAR EL MENSAJE
   ========================================= */

function normalizeMessage(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


/* =========================================
   7. PROCESAR MENSAJES DEL CHATBOT
   ========================================= */

chatForm.addEventListener("submit", function (event) {
    /* Impedir que el formulario recargue la página */
    event.preventDefault();

    const originalMessage = chatInput.value.trim();

    if (originalMessage === "") {
        return;
    }

    /* Mostrar el mensaje del visitante */
    addMessage(originalMessage, "user");

    /* Preparar el mensaje para analizarlo */
    const message = normalizeMessage(originalMessage);

    /* Vaciar el campo sin recargar la página */
    chatInput.value = "";

    /* -----------------------------------------
       COMANDO SECRETO: BARREL ROLL
       ----------------------------------------- */

    if (
        message.includes("barrel roll") ||
        message.includes("haz un giro") ||
        message.includes("gira la pagina") ||
        message.includes("haz una vuelta")
    ) {
        executeBarrelRoll();

        return;
    }

    /* -----------------------------------------
       RESPUESTAS NORMALES DEL CHATBOT
       ----------------------------------------- */

    if (
        message.includes("hola") ||
        message.includes("buenas")
    ) {
        addMessage(
            "¡Hola! Soy BE-BOT. Puedes preguntarme por la historia, los servicios o intentar descubrir un secreto.",
            "bot"
        );
    } else if (message.includes("historia")) {
        addMessage(
            "Nuestra historia cuenta cómo Bebelux reconstruyó su presencia digital después de una desaparición ficticia.",
            "bot"
        );
    } else if (
        message.includes("servicio") ||
        message.includes("producto")
    ) {
        addMessage(
            "Puedes consultar la sección Servicios para conocer la propuesta digital renovada de Bebelux 2.0.",
            "bot"
        );
    } else if (
        message.includes("contacto") ||
        message.includes("telefono")
    ) {
        addMessage(
            "Visita la sección Contacto para consultar la información disponible del negocio.",
            "bot"
        );
    } else if (message.includes("ayuda")) {
        addMessage(
            "Puedo orientarte sobre la historia, los servicios y el contacto. También hay un secreto escondido entre mis respuestas.",
            "bot"
        );
    } else {
        addMessage(
            "No tengo una respuesta para eso todavía. Prueba con historia, servicios, ayuda o intenta descubrir mi secreto.",
            "bot"
        );
    }
});


