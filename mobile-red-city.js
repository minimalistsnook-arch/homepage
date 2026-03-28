(function () {
    const lang = localStorage.getItem('mobile_lang') || 'ko';

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

    function initFaq() {
        document.querySelectorAll('.faq-q').forEach((btn) => {
            btn.addEventListener('click', () => {
                const wrap = btn.closest('.faq-item');
                if (wrap) wrap.classList.toggle('open');
            });
        });
    }

    function cleanupDuplicateBottomNav() {
        const navs = document.querySelectorAll('.mobile-bottom-nav');
        navs.forEach((nav, idx) => {
            if (idx > 0) nav.remove();
        });
    }

    function initHomeBottomLift() {
        if (!document.body.classList.contains('page-home')) return;

        const scroller = document.querySelector('.home-main');
        const bottomNav = document.querySelector('.mobile-bottom-nav');
        const bookNow = document.querySelector('.home-book-now');
        const riseLogo = document.querySelector('.home-rise-logo');
        if (!scroller || !bottomNav) return;

        let current = 0;
        let target = 0;
        let rafId = null;

        const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const applyMotion = () => {
            const eased = easeOutCubic(current);

            const navY = (1 - eased) * 52;
            bottomNav.style.transform = `translateX(-50%) translateY(${navY.toFixed(2)}px)`;
            bottomNav.style.opacity = (0.58 + eased * 0.42).toFixed(3);

            if (bookNow) {
                const ctaY = (1 - eased) * 34;
                bookNow.style.transform = `translateX(-50%) translateY(${ctaY.toFixed(2)}px)`;
                bookNow.style.opacity = (0.42 + eased * 0.58).toFixed(3);
            }

            if (riseLogo) {
                const logoY = (1 - eased) * 70;
                const logoScale = 0.94 + eased * 0.06;
                riseLogo.style.transform = `translateX(-50%) translateY(${logoY.toFixed(2)}px) scale(${logoScale.toFixed(3)})`;
                riseLogo.style.opacity = (eased * 0.96).toFixed(3);
            }
        };

        const animate = () => {
            current += (target - current) * 0.06;
            if (Math.abs(target - current) < 0.002) {
                current = target;
            }

            applyMotion();

            if (Math.abs(target - current) >= 0.002) {
                rafId = requestAnimationFrame(animate);
            } else {
                rafId = null;
            }
        };

        const onScroll = () => {
            target = clamp01(scroller.scrollTop / 300);
            if (!rafId) rafId = requestAnimationFrame(animate);
        };

        scroller.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
        });

        setLanguage(lang);
        initMenu();
        initFaq();
        cleanupDuplicateBottomNav();
        initHomeBottomLift();
    });
})();
