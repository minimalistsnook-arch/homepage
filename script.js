// Language Switching Functionality
let currentLanguage = localStorage.getItem('language') || 'en';

// Translation object
const translations = {
    en: {
        'Home': 'Home',
        'About us': 'About us',
        'FAQ': 'FAQ',
        'Find your way to us!': 'Find your way to us!',
        'Booking': 'Booking',
        'Room Type': 'Room Type',
        'Facilities': 'Facilities',
        'Contact Us': 'Contact Us',
        'Wegoinn Hostel': 'Wegoinn Hostel',
        'Your home away from home': 'Your home away from home',
        'Book Now': 'Book Now',
        '&copy; 2024 WeGoInn. All rights reserved.': '&copy; 2024 WeGoInn. All rights reserved.',
        'Wegoinn - Your Home Away From Home': 'Wegoinn - Your Home Away From Home',
        'EN': 'EN',
        'KO': 'KO',
        // FAQ Page
        'Frequently Asked Questions': 'Frequently Asked Questions',
        'SUBHEADING': 'SUBHEADING',
        'EARLY CHECK-INS': 'EARLY CHECK-INS',
        'LATE CHECK-INS': 'LATE CHECK-INS',
        'EARLY CHECK-OUTS': 'EARLY CHECK-OUTS',
        'LATE CHECK-OUTS': 'LATE CHECK-OUTS',
        'AMENITIES': 'AMENITIES',
        'ADAPTERS': 'ADAPTERS',
        'PARKING': 'PARKING',
        // Room Type Page
        'Our Room Types': 'Our Room Types',
        'Choose the perfect accommodation for your stay': 'Choose the perfect accommodation for your stay',
        'Single Room': 'Single Room',
        'Perfect for Solo Travelers': 'Perfect for Solo Travelers',
        'Double Room': 'Double Room',
        'Ideal for Couples': 'Ideal for Couples',
        'Triple Room': 'Triple Room',
        'Great for Small Groups': 'Great for Small Groups',
        'Twin Bunk': 'Twin Bunk',
        'Adventure for Two': 'Adventure for Two',
        'Four Bunk': 'Four Bunk',
        'Group Accommodation': 'Group Accommodation',
        // Facilities Page
        '3 Special Services!': '3 Special Services!',
        'Only available in Wegoinn.': 'Only available in Wegoinn.',
        'We promise you a comfortable stay experience.': 'We promise you a comfortable stay experience.',
        'Cafe': 'Cafe',
        'Izakaya': 'Izakaya',
        'Rooftop Bar': 'Rooftop Bar',
        'Libertree Cafe': 'Libertree Cafe',
        'Izakaya Lakidon': 'Izakaya Lakidon',
        // Find Us Page
        'Find Your Way To Us!': 'Find Your Way To Us!',
        'Scroll Down To Explore': 'Scroll Down To Explore',
        'Our Location': 'Our Location',
        'Getting Here': 'Getting Here',
        'What\'s Around Us': 'What\'s Around Us'
    },
    ko: {
        'Home': '홈',
        'About us': '소개',
        'FAQ': '자주묻는질문',
        'Find your way to us!': '오시는 길',
        'Booking': '예약',
        'Room Type': '객실 유형',
        'Facilities': '시설',
        'Contact Us': '연락처',
        'Wegoinn Hostel': '위고인 호스텔',
        'Your home away from home': 'Your Home Away From Home',
        'Book Now': '예약하기',
        '&copy; 2024 WeGoInn. All rights reserved.': '&copy; 2024 웨고인. 모든 권리 보유.',
        'Wegoinn - Your Home Away From Home': '위고인 - Your Home Away From Home',
        'EN': 'EN',
        'KO': 'KO',
        // FAQ Page
        'Frequently Asked Questions': '자주 묻는 질문',
        'SUBHEADING': '부제목',
        'EARLY CHECK-INS': '얼리 체크인',
        'LATE CHECK-INS': '늦은 체크인',
        'EARLY CHECK-OUTS': '얼리 체크아웃',
        'LATE CHECK-OUTS': '늦은 체크아웃',
        'AMENITIES': '편의시설',
        'ADAPTERS': '어댑터',
        'PARKING': '주차',
        // Room Type Page
        'Our Room Types': '객실 유형',
        'Choose the perfect accommodation for your stay': '완벽한 숙소를 선택하세요',
        'Single Room': '싱글룸',
        'Perfect for Solo Travelers': '솔로 여행자에게 완벽',
        'Double Room': '더블룸',
        'Ideal for Couples': '커플에게 이상적',
        'Triple Room': '트리플룸',
        'Great for Small Groups': '소규모 그룹에게 완벽',
        'Twin Bunk': '트윈 벙크',
        'Adventure for Two': '두 명을 위한 모험',
        'Four Bunk': '포어 벙크',
        'Group Accommodation': '그룹 숙박',
        // Facilities Page
        '3 Special Services!': '3가지 특별한 서비스!',
        'Only available in Wegoinn.': '웨고인에서만 이용 가능합니다.',
        'We promise you a comfortable stay experience.': '편안한 투숙 경험을 약속드립니다.',
        'Cafe': '카페',
        'Izakaya': '이자카야',
        'Rooftop Bar': '루프탑 바',
        'Libertree Cafe': '리버트리 카페',
        'Izakaya Lakidon': '이자카야 라키돈',
        // Find Us Page
        'Find Your Way To Us!': '오시는 길!',
        'Scroll Down To Explore': '아래로 스크롤하여 탐험하세요',
        'Our Location': '위치',
        'Getting Here': '오시는 방법',
        'What\'s Around Us': '주변 시설'
    }
};

// Function to update language
function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-ko]');
    elements.forEach(element => {
        const enText = element.getAttribute('data-en');
        const koText = element.getAttribute('data-ko');
        
        if (lang === 'en' && enText) {
            if (element.tagName === 'TITLE') {
                element.textContent = enText;
            } else {
                element.textContent = enText;
            }
        } else if (lang === 'ko' && koText) {
            if (element.tagName === 'TITLE') {
                element.textContent = koText;
            } else {
                element.textContent = koText;
            }
        }
    });
    
    // Update active state of language buttons
    updateLanguageButtonStates();
}

// Function to update button active states
function updateLanguageButtonStates() {
    // Desktop buttons
    const enBtn = document.getElementById('enBtn');
    const koBtn = document.getElementById('koBtn');
    
    if (enBtn) {
        enBtn.classList.toggle('active', currentLanguage === 'en');
    }
    if (koBtn) {
        koBtn.classList.toggle('active', currentLanguage === 'ko');
    }
    
    // Mobile buttons
    const mobileEnBtn = document.getElementById('mobileEnBtn');
    const mobileKoBtn = document.getElementById('mobileKoBtn');
    
    if (mobileEnBtn) {
        mobileEnBtn.classList.toggle('active', currentLanguage === 'en');
    }
    if (mobileKoBtn) {
        mobileKoBtn.classList.toggle('active', currentLanguage === 'ko');
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLanguage);
    
    // Add event listeners to desktop language buttons
    const enBtn = document.getElementById('enBtn');
    const koBtn = document.getElementById('koBtn');
    
    if (enBtn) {
        enBtn.addEventListener('click', () => {
            updateLanguage('en');
        });
    }
    
    if (koBtn) {
        koBtn.addEventListener('click', () => {
            updateLanguage('ko');
        });
    }
    
    // Add event listeners to mobile language buttons
    const mobileEnBtn = document.getElementById('mobileEnBtn');
    const mobileKoBtn = document.getElementById('mobileKoBtn');
    
    if (mobileEnBtn) {
        mobileEnBtn.addEventListener('click', () => {
            updateLanguage('en');
        });
    }
    
    if (mobileKoBtn) {
        mobileKoBtn.addEventListener('click', () => {
            updateLanguage('ko');
        });
    }
});

// Legacy nav fallback
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature, .contact-item, .about-text');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


// Mobile sidebar navigation
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if (!sidebar || !hamburgerBtn || !sidebarOverlay) return;

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    const openSidebar = () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    };

    hamburgerBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) closeSidebar();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeSidebar();
        }
    });
});
