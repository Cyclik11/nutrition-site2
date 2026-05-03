// === REVEAL ANIMATION ===
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

reveals.forEach((el) => observer.observe(el));


// === IMAGE MODAL (КРАСИВАЯ ГАЛЕРЕЯ) ===

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.image-modal-close');

const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));

let currentIndex = 0;

// открыть
function updateImage() {
  const img = galleryImages[currentIndex];
  if (!img) return;

  modalImage.src = img.src;
}

// закрыть
function closeImageModal() {
  imageModal.style.display = 'none';
  document.body.style.overflow = '';
}

// обновить картинку
function updateImage() {
  const img = galleryImages[currentIndex];
  modalImage.src = img.src;
  modalImage.alt = img.alt;
}

// следующий
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateImage();
}

// предыдущий
function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateImage();
}

// клик по картинке
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

// закрытие
closeModal.addEventListener('click', closeImageModal);

// клик вне картинки
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) closeImageModal();
});

// клавиатура
document.addEventListener('keydown', (e) => {
  if (imageModal.style.display !== 'flex') return;

  if (e.key === 'Escape') closeImageModal();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});


// === SWIPE (МОБИЛКА) ===

let startX = 0;

imageModal.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

imageModal.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextImage(); // свайп влево
  } else if (endX - startX > 50) {
    prevImage(); // свайп вправо
  }
});
