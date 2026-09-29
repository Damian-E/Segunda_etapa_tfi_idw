// Gestión de Modo Oscuro con Bootstrap 5.3 y LocalStorage
(function () {
    const STORAGE_KEY = 'veterinaria-theme';

    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY);
    }

    function getPreferredTheme() {
        const stored = getStoredTheme();
        if (stored) {
            return stored;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        updateToggleButtons(theme);
    }

    function updateToggleButtons(theme) {
        const buttons = document.querySelectorAll('.theme-toggle-btn');
        buttons.forEach(button => {
            const icon = button.querySelector('.theme-icon');
            const text = button.querySelector('.theme-text');
            const isDark = theme === 'dark';

            if (icon) {
                icon.className = isDark ? 'fa-solid fa-sun theme-icon text-warning' : 'fa-solid fa-moon theme-icon';
            }
            if (text) {
                text.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
            }
            button.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
            button.setAttribute('title', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
        });
    }

    // Aplicar inmediatamente para evitar destellos blancos al navegar
    const initialTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-bs-theme', initialTheme);

    // Configurar listeners cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(getPreferredTheme());

        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
                const next = current === 'dark' ? 'light' : 'dark';
                localStorage.setItem(STORAGE_KEY, next);
                applyTheme(next);
            });
        });
    });

    // Sincronizar si el usuario cambia el tema del sistema operativo y no eligió manualmente
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!getStoredTheme()) {
            applyTheme(getPreferredTheme());
        }
    });
})();
