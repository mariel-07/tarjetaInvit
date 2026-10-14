/* =====================================================
   INVITACIÓN MIS XV AÑOS · ALIZ
   JavaScript - Funcionalidad Completa y Optimizada
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. ELEMENTOS PRINCIPALES
       ===================================================== */
    const entrada = document.getElementById("entrada");
    const invitacion = document.getElementById("invitacion");
    const abrirInvitacion = document.getElementById("abrirInvitacion");
    const musica = document.getElementById("musica");
    const btnMusica = document.getElementById("btnMusica");


    /* =====================================================
       2. ABRIR INVITACIÓN CON MÚSICA
       ===================================================== */
    if (abrirInvitacion && entrada && invitacion) {
        abrirInvitacion.addEventListener("click", function () {

            // Ocultar la pantalla de entrada con animación
            entrada.classList.add("salida");
            invitacion.classList.add("activa");

            // Permitir desplazamiento
            document.body.style.overflow = "auto";

            // Intentar reproducir música automáticamente al interactuar
            if (musica && btnMusica) {
                musica.play()
                    .then(function () {
                        btnMusica.innerHTML = '<span class="icono-nota">♫</span>';
                        btnMusica.classList.add("reproduciendo");
                    })
                    .catch(function () {
                        btnMusica.innerHTML = '<span class="icono-nota">♪</span>';
                        btnMusica.classList.remove("reproduciendo");
                    });
            }

            // Scroll suave hacia el inicio de la invitación
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       3. CONTROL DE MÚSICA (PLAY / PAUSA)
       ===================================================== */
    if (btnMusica && musica) {
        btnMusica.addEventListener("click", function () {
            if (musica.paused) {
                musica.play()
                    .then(function () {
                        btnMusica.innerHTML = '<span class="icono-nota">♫</span>';
                        btnMusica.classList.add("reproduciendo");
                    })
                    .catch(function () {
                        btnMusica.innerHTML = '<span class="icono-nota">♪</span>';
                        btnMusica.classList.remove("reproduciendo");
                    });
            } else {
                musica.pause();
                btnMusica.innerHTML = '<span class="icono-nota">🔇</span>';
                btnMusica.classList.remove("reproduciendo");
            }
        });
    }


    /* =====================================================
       4. CUENTA REGRESIVA
       Fecha del Evento: 14 de Noviembre de 2026, 8:00 P.M.
       (Mes 10 = Noviembre en JavaScript)
       ===================================================== */
    const fechaEvento = new Date(2026, 10, 14, 20, 0, 0).getTime();

    function actualizarContador() {
        const diasElemento = document.getElementById("dias");
        const horasElemento = document.getElementById("horas");
        const minutosElemento = document.getElementById("minutos");
        const segundosElemento = document.getElementById("segundos");

        if (!diasElemento || !horasElemento || !minutosElemento || !segundosElemento) {
            return;
        }

        const ahora = Date.now();
        const diferencia = fechaEvento - ahora;

        if (diferencia <= 0) {
            diasElemento.textContent = "00";
            horasElemento.textContent = "00";
            minutosElemento.textContent = "00";
            segundosElemento.textContent = "00";
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        diasElemento.textContent = String(dias).padStart(2, "0");
        horasElemento.textContent = String(horas).padStart(2, "0");
        minutosElemento.textContent = String(minutos).padStart(2, "0");
        segundosElemento.textContent = String(segundos).padStart(2, "0");
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);


    /* =====================================================
       5. CARRUSEL DE RECUERDOS (FOTOS DE ALIZ)
       ===================================================== */
    function iniciarCarrusel() {
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
        let intervaloAuto = null;

        // Limpiar puntos previos
        indicadores.innerHTML = "";

        // Generar puntos de navegación
        fotos.forEach(function (_, indice) {
            const punto = document.createElement("button");
            punto.type = "button";
            punto.className = "carrusel-punto";
            punto.setAttribute("aria-label", "Ver recuerdo " + (indice + 1));
            punto.setAttribute("aria-current", "false");

            punto.addEventListener("click", function () {
                mostrarFoto(indice);
                reiniciarAutoSlide();
            });

            indicadores.appendChild(punto);
        });

        const puntos = indicadores.querySelectorAll(".carrusel-punto");

        function mostrarFoto(indice) {
            indiceActual = (indice + fotos.length) % fotos.length;
            slider.style.transform = "translateX(-" + (indiceActual * 100) + "%)";

            puntos.forEach(function (punto, i) {
                const estaActivo = (i === indiceActual);
                punto.classList.toggle("activo", estaActivo);
                punto.setAttribute("aria-current", estaActivo ? "true" : "false");
            });
        }

        botonAnterior.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarFoto(indiceActual - 1);
            reiniciarAutoSlide();
        });

        botonSiguiente.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarFoto(indiceActual + 1);
            reiniciarAutoSlide();
        });

        // Soporte de navegación por teclado
        slider.setAttribute("tabindex", "0");
        slider.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") {
                mostrarFoto(indiceActual + 1);
                reiniciarAutoSlide();
            } else if (e.key === "ArrowLeft") {
                mostrarFoto(indiceActual - 1);
                reiniciarAutoSlide();
            }
        });

        // Gestos táctiles en celulares (Swipe)
        let inicioX = 0;
        let inicioY = 0;

        slider.addEventListener("touchstart", function (e) {
            if (!e.changedTouches.length) return;
            inicioX = e.changedTouches[0].clientX;
            inicioY = e.changedTouches[0].clientY;
        }, { passive: true });

        slider.addEventListener("touchend", function (e) {
            if (!e.changedTouches.length) return;
            const finalX = e.changedTouches[0].clientX;
            const finalY = e.changedTouches[0].clientY;
            const distanciaX = finalX - inicioX;
            const distanciaY = finalY - inicioY;

            if (Math.abs(distanciaX) > 40 && Math.abs(distanciaX) > Math.abs(distanciaY)) {
                mostrarFoto(indiceActual + (distanciaX < 0 ? 1 : -1));
                reiniciarAutoSlide();
            }
        }, { passive: true });

        // Auto avance suave cada 5 segundos
        function iniciarAutoSlide() {
            detenerAutoSlide();
            intervaloAuto = setInterval(function () {
                mostrarFoto(indiceActual + 1);
            }, 2000);
        }

        function detenerAutoSlide() {
            if (intervaloAuto) {
                clearInterval(intervaloAuto);
                intervaloAuto = null;
            }
        }

        function reiniciarAutoSlide() {
            iniciarAutoSlide();
        }

        slider.addEventListener("mouseenter", detenerAutoSlide);
        slider.addEventListener("mouseleave", iniciarAutoSlide);

        // Mostrar primera foto e iniciar rotación
        mostrarFoto(0);
        iniciarAutoSlide();
    }

    iniciarCarrusel();


    /* =====================================================
       6. REVELADO SUAVE AL HACER SCROLL (SCROLL REVEAL)
       ===================================================== */
    const secciones = document.querySelectorAll(".seccion, .cierre");

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            function (entradas, obs) {
                entradas.forEach(function (entradaObs) {
                    if (entradaObs.isIntersecting) {
                        entradaObs.target.style.opacity = "1";
                        entradaObs.target.style.transform = "translateY(0)";
                        obs.unobserve(entradaObs.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        secciones.forEach(function (seccion) {
            seccion.style.opacity = "0";
            seccion.style.transform = "translateY(35px)";
            seccion.style.transition = "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
            observador.observe(seccion);
        });
    } else {
        secciones.forEach(function (seccion) {
            seccion.style.opacity = "1";
            seccion.style.transform = "translateY(0)";
        });
    }

});