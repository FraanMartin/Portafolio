document.addEventListener('DOMContentLoaded', function() {
    const scrollDownButton = document.getElementById('scroll-down');
    const navProjectsLink = document.querySelector('nav a[href="#proyectos"]');
    const navSobreMiLink = document.querySelector('nav a[href="#sobre-mi"]');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const introSection = document.querySelector('#proyectos .intro'); // Selecciona el contenedor del h2

    function scrollToSection(targetId, hideScrollDown = true) {
        const target = document.getElementById(targetId);
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // Duración de la animación en milisegundos (800 ms)
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Función de easing

            window.scrollTo(0, startPosition + distance * easeInOut(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else if (hideScrollDown) {
                scrollDownButton.style.display = 'none'; // Ocultar la flecha si es necesario
            }
        }

        requestAnimationFrame(animation);
    }

    function handleScrollDownButtonClick() {
        scrollToSection('proyectos', true); // Llamar a la función con `hideScrollDown` en true
    }

    function handleNavClick(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        const targetId = event.target.getAttribute('href').substring(1); // Obtener el ID del destino desde el href
        scrollToSection(targetId, true); // Llamar a la función con `hideScrollDown` en true
    }

    function checkScrollPosition() {
        const proyectosSection = document.getElementById('proyectos');
        const sobreMiSection = document.getElementById('sobre-mi');
        const proyectosPosition = proyectosSection.getBoundingClientRect().top + window.pageYOffset;
        const sobreMiPosition = sobreMiSection.getBoundingClientRect().top + window.pageYOffset;
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Mostrar u ocultar la flecha de desplazamiento hacia abajo
        if (scrollPosition >= proyectosPosition || scrollPosition >= sobreMiPosition) {
            scrollDownButton.style.display = 'none'; // Ocultar la flecha si se ha llegado a la sección de proyectos o sobre mí
        } else if (scrollPosition <= 0) {
            scrollDownButton.style.display = 'flex'; // Mostrar la flecha si estás al principio de la página
        } else {
            scrollDownButton.style.display = 'none'; // Ocultar la flecha si estás en medio de la página
        }

        // Mostrar el botón de scroll to top si se ha desplazado hacia abajo
        if (scrollPosition > 200) { // Mostrar el botón si se ha desplazado más de 200px
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }

        // Mostrar u ocultar el h2 cuando se llega a la sección de proyectos
        if (scrollPosition >= proyectosPosition - windowHeight / 2 && scrollPosition < proyectosPosition + windowHeight / 2) {
            introSection.classList.add('visible'); // Hacer visible el h2
        } else {
            introSection.classList.remove('visible'); // Ocultar el h2
        }
    }

    function scrollToTop() {
        // Desplazamiento suave hacia arriba
        const duration = 800; // Duración de la animación en milisegundos (800 ms)
        const startPosition = window.pageYOffset;
        const distance = -startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Función de easing

            window.scrollTo(0, startPosition + distance * easeInOut(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Añadir el evento click a la flecha de desplazamiento hacia abajo
    scrollDownButton.addEventListener('click', handleScrollDownButtonClick);

    // Añadir el evento click a los enlaces de navegación
    navProjectsLink.addEventListener('click', handleNavClick);
    navSobreMiLink.addEventListener('click', handleNavClick);

    // Añadir el evento scroll para ocultar la flecha cuando se llega a las secciones y mostrar el botón de scroll to top
    window.addEventListener('scroll', checkScrollPosition);

    // Añadir el evento click al botón de scroll to top
    scrollToTopButton.addEventListener('click', scrollToTop);
});
