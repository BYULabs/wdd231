export function initHeaderSearch() {
    if (document.getElementById('searchInput')) return;

    function attachSearchBehavior(btn, labelSelector) {
        if (!btn) return;

        const label = labelSelector ? btn.querySelector(labelSelector) : null;
        let input = null;
        let active = false;

        function openSearch(e) {
            e.preventDefault();

            if (active) {
                navigate();
                return;
            }

            active = true;

            input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Search anime…';
            input.setAttribute('aria-label', 'Search anime');

            Object.assign(input.style, {
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'inherit',
                font: 'inherit',
                fontSize: '14px',
                width: label ? `${label.offsetWidth}px` : '120px',
                minWidth: '80px',
            });

            if (label) {
                label.replaceWith(input);
            } else {
                btn.appendChild(input);
            }

            input.focus();

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') navigate();
                if (e.key === 'Escape') closeSearch();
            });
        }

        function navigate() {
            const q = input ? input.value.trim() : '';
            if (q.length > 0) {
                window.location.href = `search.html?q=${encodeURIComponent(q)}`;
            } else {
                closeSearch();
            }
        }

        function closeSearch() {
            if (!active) return;
            active = false;
            if (label && input) {
                input.replaceWith(label);
            } else if (input) {
                input.remove();
            }
            input = null;
        }

        btn.addEventListener('click', openSearch);

    }

    attachSearchBehavior(document.querySelector('.search-btn'), 'span');
    attachSearchBehavior(document.querySelector('.mobile-search-btn'), null);
}