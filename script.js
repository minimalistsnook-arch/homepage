// Language Switching Functionality
let currentLanguage = localStorage.getItem('language') || 'en';

const translations = {
    en: {
        'Home': 'Home', 'About us': 'About us', 'FAQ': 'FAQ',
        'Booking': 'Booking', 'Room Type': 'Room Type', 'Facilities': 'Facilities',
        'Contact Us': 'Contact Us', 'Wegoinn Hostel': 'Wegoinn Hostel',
        'Your home away from home': 'Your home away from home', 'Book Now': 'Book Now',
        'Find Your Way To Us!': 'Find Your Way To Us!',
        'Scroll Down To Explore': 'Scroll Down To Explore',
        'Our Location': 'Our Location', 'Getting Here': 'Getting Here',
        'Frequently Asked Questions': 'Frequently Asked Questions',
        'EARLY CHECK-INS': 'EARLY CHECK-INS', 'LATE CHECK-INS': 'LATE CHECK-INS',
        'EARLY CHECK-OUTS': 'EARLY CHECK-OUTS', 'LATE CHECK-OUTS': 'LATE CHECK-OUTS',
        'AMENITIES': 'AMENITIES', 'ADAPTERS': 'ADAPTERS', 'PARKING': 'PARKING',
        'Our Room Types': 'Our Room Types', 'Single Room': 'Single Room',
        'Double Room': 'Double Room', 'Triple Room': 'Triple Room',
        'Twin Bunk': 'Twin Bunk', 'Four Bunk': 'Four Bunk',
        '3 Special Services!': '3 Special Services!',
        'Libertree Cafe': 'Libertree Cafe', 'Izakaya Lakidon': 'Izakaya Lakidon'
    },
    ko: {
        'Home': '홈', 'About us': '소개', 'FAQ': '자주묻는질문',
        'Booking': '예약', 'Room Type': '객실 유형', 'Facilities': '시설',
        'Contact Us': '연락처', 'Wegoinn Hostel': '위고인 호스텔',
        'Your home away from home': 'Your Home Away From Home', 'Book Now': '예약하기',
        'Find Your Way To Us!': '오시는 길!',
        'Scroll Down To Explore': '아래로 스크롤하여 탐험하세요',
        'Our Location': '위치', 'Getting Here': '오시는 방법',
        'Frequently Asked Questions': '자주 묻는 질문',
        'EARLY CHECK-INS': '얼리 체크인', 'LATE CHECK-INS': '늦은 체크인',
        'EARLY CHECK-OUTS': '얼리 체크아웃', 'LATE CHECK-OUTS': '늦은 체크아웃',
        'AMENITIES': '편의시설', 'ADAPTERS': '어댑터', 'PARKING': '주차',
        'Our Room Types': '객실 유형', 'Single Room': '싱글룸',
        'Double Room': '더블룸', 'Triple Room': '트리플룸',
        'Twin Bunk': '트윈 벙크', 'Four Bunk': '포어 벙크',
        '3 Special Services!': '3가지 특별한 서비스!',
        'Libertree Cafe': '리버트리 카페', 'Izakaya Lakidon': '이자카야 라키돈'
    }
};

function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en][data-ko]').forEach(el => {
        const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ko');
        if (text) el.textContent = text;
    });
    updateLanguageButtonStates();
}

function updateLanguageButtonStates() {
    ['enBtn','koBtn','mobileEnBtn','mobileKoBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const isEn = id.toLowerCase().includes('en');
        btn.classList.toggle('active', isEn ? currentLanguage === 'en' : currentLanguage === 'ko');
    });
}

// ── Hamburger / Sidebar ──────────────────────────────────────────────────────
function initHamburger() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!hamburgerBtn || !sidebar) return;

    function openSidebar() {
        sidebar.classList.add('active');
        hamburgerBtn.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
        sidebar.classList.remove('active');
        hamburgerBtn.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', () =>
        sidebar.classList.contains('active') ? closeSidebar() : openSidebar()
    );
    if (overlay) overlay.addEventListener('click', closeSidebar);
    document.querySelectorAll('.sidebar-link').forEach(link =>
        link.addEventListener('click', closeSidebar)
    );
}

// ── DOMContentLoaded ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLanguage);

    ['enBtn','koBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () =>
            updateLanguage(id === 'enBtn' ? 'en' : 'ko')
        );
    });
    ['mobileEnBtn','mobileKoBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () =>
            updateLanguage(id === 'mobileEnBtn' ? 'en' : 'ko')
        );
    });

    initHamburger();

    const animatedElements = document.querySelectorAll('.feature, .contact-item, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ── Contact Form (with null guard) ────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !subject || !message) { alert('Please fill in all fields'); return; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { alert('Please enter a valid email address'); return; }

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// ── Smooth Scrolling ──────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Scroll Animation Observer ─────────────────────────────────────────────────
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ── Page Load Fade-in ─────────────────────────────────────────────────────────
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});


function scrollImages(wrapperId, direction) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;
    const distance = wrapper.clientWidth * 0.85;
    wrapper.scrollBy({ left: distance * direction, behavior: 'smooth' });
}

function toggleFAQ(header) {
    if (!header) return;
    const faqItem = header.parentElement;
    const content = faqItem ? faqItem.querySelector('.faq-content') : null;
    const icon = header.querySelector('.faq-icon');
    if (!faqItem || !content) return;

    faqItem.classList.toggle('active');
    content.style.maxHeight = faqItem.classList.contains('active') ? `${content.scrollHeight}px` : '0px';

    if (icon) {
        icon.classList.toggle('fa-plus', !faqItem.classList.contains('active'));
        icon.classList.toggle('fa-minus', faqItem.classList.contains('active'));
    }
}

function openTransportLink(type) {
    const links = {
        subway: 'https://www.airport.kr/ap_en/1512/subview.do',
        bus: 'https://airportlimousine.co.kr/en/sub/sub01.php?cat_no=2',
        taxi: 'https://xn--ob0bj92bdidosgv4fhzh.org/index#%EB%AC%B8%EC%9D%98%ED%95%98%EA%B8%B0'
    };
    if (links[type]) {
        window.open(links[type], '_blank', 'noopener,noreferrer');
    }
}

const roomTypes = ['single', 'double', 'triple', 'twinbunk', 'fourbunk', 'handic', 'twin', 'standardfamily', 'deluxefamily'];
const roomImages = {
    single: ['images/singleNew.jpg', 'images/singleNew2.jpg', 'images/singleThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
    double: ['images/doubleOne.png', 'images/doubleTwo.png', 'images/doubleThree.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
    triple: ['images/familyNew.jpg', 'images/tripleTwo.png', 'images/tripleThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
    twinbunk: ['images/twinOne.png', 'images/twinTwo.png', 'images/twinThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
    fourbunk: ['images/familyOne.png', 'images/familyTwo.png', 'images/FamilyThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
    handic: ['images/handicOne.png', 'images/handicTwo.png', 'images/handicThree.png', 'images/handicFour.png', 'images/handicFive.png'],
    twin: ['images/Twin Room.jpg', 'images/Twin Room3.jpg', 'images/Twin Room4.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
    standardfamily: ['images/standardOne.jpg', 'images/standardTwo.jpg', 'images/standardThree.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
    deluxefamily: ['images/deluxeFamilyThree.jpg', 'images/deluxeFamilyTwo.jpg', 'images/deluxeFamilyOne.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg']
};
const currentImageIndex = Object.fromEntries(roomTypes.map((roomType) => [roomType, 0]));

function changeImage(roomType, direction) {
    const images = roomImages[roomType];
    if (!images || !images.length) return;

    let newIndex = currentImageIndex[roomType] + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    currentImageIndex[roomType] = newIndex;

    const imageElement = document.getElementById(`${roomType}-image`);
    const counterElement = document.getElementById(`${roomType}-counter`);
    if (!imageElement || !counterElement) return;

    imageElement.style.opacity = '0';
    imageElement.src = images[newIndex];
    counterElement.textContent = `${newIndex + 1} / ${images.length}`;
    setTimeout(() => {
        imageElement.style.opacity = '1';
    }, 150);
}

function initializeRoomSliders() {
    roomTypes.forEach((roomType) => {
        const images = roomImages[roomType];
        const imageElement = document.getElementById(`${roomType}-image`);
        const counterElement = document.getElementById(`${roomType}-counter`);
        if (images && images.length > 0 && imageElement && counterElement) {
            imageElement.src = images[0];
            counterElement.textContent = `1 / ${images.length}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.image-slider')) {
        initializeRoomSliders();
    }
});
