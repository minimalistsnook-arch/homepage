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

    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach((item) => {
            const qBtn = item.querySelector('.faq-q');
            if (!qBtn) return;

            qBtn.setAttribute('aria-expanded', 'false');
            qBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                item.classList.toggle('open', !isOpen);
                qBtn.setAttribute('aria-expanded', String(!isOpen));
            });
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
        initFaqAccordion();
    });
})();
