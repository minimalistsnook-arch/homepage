const roomTypes = ['single', 'double', 'triple', 'twinbunk', 'fourbunk', 'handic', 'twin', 'standardfamily', 'deluxefamily'];

const roomImages = {
  single: ['images/singleNew.jpg', 'images/singleNew2.jpg', 'images/singleThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
  double: ['images/doubleOne.png', 'images/doubleTwo.png', 'images/doubleThree.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
  triple: ['images/familyNew.jpg', 'images/tripleTwo.png', 'images/tripleThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
  twinbunk: ['images/twinOne.png', 'images/twinTwo.png', 'images/twinThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
  fourbunk: ['images/familyOne.png', 'images/familyTwo.png', 'images/familyThree.png', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
  handic: ['images/handicOne.png', 'images/handicTwo.png', 'images/handicThree.png', 'images/handicFour.png', 'images/handicFive.png'],
  twin: ['images/Twin Room.jpg', 'images/Twin Room3.jpg', 'images/Twin Room4.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
  standardfamily: ['images/standardOne.jpg', 'images/standardTwo.jpg', 'images/standardThree.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
  deluxefamily: ['images/deluxeFamilyThree.jpg', 'images/deluxeFamilyTwo.jpg', 'images/deluxeFamilyOne.jpg', 'images/bathroomOne.jpg', 'images/bathroomTwo.jpg'],
};

const currentImageIndex = Object.fromEntries(roomTypes.map((roomType) => [roomType, 0]));

const placeholderSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#f6d4a6" offset="0%"/>
        <stop stop-color="#d26b42" offset="100%"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#g)"/>
    <circle cx="950" cy="180" r="120" fill="rgba(255,255,255,0.18)"/>
    <circle cx="220" cy="720" r="180" fill="rgba(255,255,255,0.12)"/>
    <text x="50%" y="46%" text-anchor="middle" fill="#fff8f0" font-size="72" font-family="Poppins, Arial, sans-serif" font-weight="700">WeGoInn</text>
    <text x="50%" y="55%" text-anchor="middle" fill="#fff8f0" font-size="34" font-family="Poppins, Arial, sans-serif">Room image placeholder</text>
  </svg>
`);
const placeholderImage = `data:image/svg+xml;charset=UTF-8,${placeholderSvg}`;

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-en][data-ko]').forEach((element) => {
    const text = element.dataset[lang];
    if (!text) return;
    if (element.tagName === 'TITLE') {
      document.title = text;
      return;
    }
    element.textContent = text;
  });

  document.querySelectorAll('.language-btn, .mobile-language-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });

  window.localStorage.setItem('wegoinn-language', lang);
}

function getImageSet(roomType) {
  return roomImages[roomType] && roomImages[roomType].length ? roomImages[roomType] : [placeholderImage];
}

function renderRoomImage(roomType) {
  const images = getImageSet(roomType);
  const imageElement = document.getElementById(`${roomType}-image`);
  const counterElement = document.getElementById(`${roomType}-counter`);
  if (!imageElement || !counterElement) return;

  const index = currentImageIndex[roomType] % images.length;
  imageElement.style.opacity = '0';
  imageElement.src = images[index];
  imageElement.alt = `${roomType} room image ${index + 1}`;
  counterElement.textContent = `${index + 1} / ${images.length}`;

  requestAnimationFrame(() => {
    imageElement.style.opacity = '1';
  });
}

function changeImage(roomType, direction) {
  const images = getImageSet(roomType);
  currentImageIndex[roomType] = (currentImageIndex[roomType] + direction + images.length) % images.length;
  renderRoomImage(roomType);
}

function setRoomImages(roomType, imagePaths) {
  roomImages[roomType] = imagePaths;
  currentImageIndex[roomType] = 0;
  renderRoomImage(roomType);
}

function addRoomImages(roomType, newImagePaths) {
  roomImages[roomType] = (roomImages[roomType] || []).concat(newImagePaths);
  renderRoomImage(roomType);
}

function initRoomSliders() {
  roomTypes.forEach((roomType) => renderRoomImage(roomType));

  document.querySelectorAll('.slider-arrow').forEach((button) => {
    button.addEventListener('click', () => {
      changeImage(button.dataset.roomType, Number(button.dataset.direction));
    });
  });

  document.querySelectorAll('.slider-image').forEach((image) => {
    image.addEventListener('error', () => {
      image.src = placeholderImage;
    });
  });
}

function initLanguageControls() {
  const savedLanguage = window.localStorage.getItem('wegoinn-language') || 'en';
  document.querySelectorAll('.language-btn, .mobile-language-btn').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });
  applyLanguage(savedLanguage);
}

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  if (!sidebar || !overlay || !hamburgerBtn) return;

  const toggle = (isOpen) => {
    sidebar.classList.toggle('is-open', isOpen);
    overlay.classList.toggle('is-open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  };

  hamburgerBtn.addEventListener('click', () => {
    toggle(!sidebar.classList.contains('is-open'));
  });

  overlay.addEventListener('click', () => toggle(false));
  document.querySelectorAll('.sidebar-link').forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguageControls();
  initSidebar();
  if (document.querySelector('.roomtype-page')) {
    initRoomSliders();
  }
});

window.changeImage = changeImage;
window.setRoomImages = setRoomImages;
window.addRoomImages = addRoomImages;
