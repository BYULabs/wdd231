// === MÓDULO DE NAVEGACIÓN Y MENÚ MÓVIL ===

export function initNavigation() {
    const header = document.getElementById('main-header');
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Salir de la función de forma segura si los elementos no existen en la página actual
    if (!header || !openBtn || !closeBtn || !mobileMenu) return;

    // === EFECTO SCROLL DEL NAVBAR ===
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // === CONTROL DEL MENÚ MÓVIL (HAMBURGUESA) ===
    openBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Cerrar menú al dar click a una opción móvil
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}