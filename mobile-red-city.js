(function () {
    const lang = localStorage.getItem('mobile_lang') || 'ko';

    function setAppVh() {
        document.documentElement.style.setProperty('--app-vh', `${window.innerHeight}px`);
    }

    function setLanguage(nextLang) {
        document.querySelectorAll('[data-ko][data-en]').forEach((el) => {
            el.textContent = nextLang === 'ko' ? el.dataset.ko : el.dataset.en;
        });

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.lang === nextLang);
        });

        localStorage.setItem('mobile_lang', nextLang);
        document.documentElement.lang = nextLang;
    }

    function initMenu() {
        const btn = document.querySelector('.menu-btn');
        const menu = document.querySelector('.mobile-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', () => {
            menu.classList.toggle('open');
        });

        menu.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => menu.classList.remove('open'));
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setAppVh();
        window.addEventListener('resize', setAppVh, { passive: true });
        window.addEventListener('orientationchange', setAppVh, { passive: true });

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
        });

        setLanguage(lang);
        initMenu();
    });
})();
