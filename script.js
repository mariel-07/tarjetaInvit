/* =====================================================
   ELEMENTOS
===================================================== */

const entrada =
    document.getElementById("entrada");

const invitacion =
    document.getElementById("invitacion");

const abrirInvitacion =
    document.getElementById("abrirInvitacion");

const musica =
    document.getElementById("musica");

const btnMusica =
    document.getElementById("btnMusica");


/* =====================================================
   ABRIR INVITACIÓN
===================================================== */

abrirInvitacion.addEventListener(
    "click",
    () => {

        /*
         * Intentamos reproducir
         * la música.
         */

        musica.play()
            .then(() => {

                btnMusica.textContent = "♫";

            })
            .catch(() => {

                btnMusica.textContent = "♪";

            });


        /*
         * Animación de salida
         */

        entrada.classList.add("salida");


        /*
         * Mostrar invitación
         */

        invitacion.classList.add("activa");


        /*
         * Evitar scroll mientras
         * se abre.
         */

        document.body.style.overflow =
            "auto";

    }
);


/* =====================================================
   MÚSICA
===================================================== */

btnMusica.addEventListener(
    "click",
    () => {

        if (musica.paused) {

            musica.play();

            btnMusica.textContent =
                "♫";

        } else {

            musica.pause();

            btnMusica.textContent =
                "🔇";

        }

    }
);


/* =====================================================
   CUENTA REGRESIVA
===================================================== */


/*
 * CAMBIA ESTA FECHA
 *
 * Año-Mes-Día Hora
 */

const fechaEvento = new Date("2026-11-14T20:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    /*
     * Si la fecha ya pasó
     */
    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = String(dias).padStart(2, "0");
    document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

/* =====================================================
   SCROLL REVEAL
===================================================== */

const elementos =
    document.querySelectorAll(
        ".seccion"
    );


const observer =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                (entrada) => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.style.opacity =
                            "1";

                        entrada.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: .15
        }
    );


elementos.forEach(
    (elemento) => {

        elemento.style.opacity =
            "0";

        elemento.style.transform =
            "translateY(30px)";

        elemento.style.transition =
            "opacity 1s ease, transform 1s ease";

        observer.observe(elemento);

    }
);



/* =====================================================
   CUENTA REGRESIVA — XV AÑOS
   Fecha: 24 de octubre de 2026, 7:00 p. m.
===================================================== */

const fechaXV = new Date(
    2026, 10, 14, 20, 0, 0
).getTime();

const elementosCosmicos = {
    dias: document.getElementById("cosDias"),
    horas: document.getElementById("cosHoras"),
    minutos: document.getElementById("cosMinutos"),
    segundos: document.getElementById("cosSegundos")
};

function actualizarCuentaCosmica() {
    const ahora = Date.now();
    const diferencia = fechaXV - ahora;

    if (diferencia <= 0) {
        Object.values(elementosCosmicos).forEach(elemento => {
            if (elemento) elemento.textContent = "00";
        });
        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia % (1000 * 60)) / 1000
    );

    elementosCosmicos.dias.textContent =
        String(dias).padStart(2, "0");

    elementosCosmicos.horas.textContent =
        String(horas).padStart(2, "0");

    elementosCosmicos.minutos.textContent =
        String(minutos).padStart(2, "0");

    elementosCosmicos.segundos.textContent =
        String(segundos).padStart(2, "0");
}

actualizarCuentaCosmica();

setInterval(actualizarCuentaCosmica, 1000);



/* =========================================
   CARRUSEL DE RECUERDOS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("slider");
    const botonAnterior = document.getElementById("fotoAnterior");
    const botonSiguiente = document.getElementById("fotoSiguiente");
    const indicadores = document.getElementById("dot-indicators");

    if (!slider || !botonAnterior || !botonSiguiente || !indicadores) {
        return;
    }

    const fotos = slider.querySelectorAll(".carrusel-slide");

    if (fotos.length === 0) return;

    let indiceActual = 0;

    // Crear los puntos automáticamente
    fotos.forEach(function (_, indice) {

        const punto = document.createElement("button");

        punto.type = "button";
        punto.className = "carrusel-punto";
        punto.setAttribute("aria-label", "Ver foto " + (indice + 1));

        punto.addEventListener("click", function () {
            mostrarFoto(indice);
        });

        indicadores.appendChild(punto);

    });

    const puntos = indicadores.querySelectorAll(".carrusel-punto");

    // Mostrar la fotografía seleccionada
    function mostrarFoto(indice) {

        indiceActual = (indice + fotos.length) % fotos.length;

        slider.style.transform =
            "translateX(-" + (indiceActual * 100) + "%)";

        puntos.forEach(function (punto, i) {

            punto.classList.toggle("activo", i === indiceActual);

        });

    }

    // Fotografía anterior
    botonAnterior.addEventListener("click", function () {

        mostrarFoto(indiceActual - 1);

    });

    // Fotografía siguiente
    botonSiguiente.addEventListener("click", function () {

        mostrarFoto(indiceActual + 1);

    });

    // Deslizar con el dedo en celulares
    let inicioX = 0;

    slider.addEventListener("touchstart", function (evento) {

        inicioX = evento.changedTouches[0].screenX;

    }, { passive: true });

    slider.addEventListener("touchend", function (evento) {

        const finalX = evento.changedTouches[0].screenX;
        const distancia = finalX - inicioX;

        if (Math.abs(distancia) > 45) {

            mostrarFoto(
                indiceActual + (distancia < 0 ? 1 : -1)
            );

        }

    }, { passive: true });

    // Iniciar en la primera fotografía
    mostrarFoto(0);

});
