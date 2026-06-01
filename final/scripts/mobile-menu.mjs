export function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (!menuToggle || !mobileMenu || !mobileOverlay) {
        return;
    }

    const openMobileMenu = () => {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileMenuClose?.addEventListener('click', closeMobileMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}