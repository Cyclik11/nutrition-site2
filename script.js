// === REVEAL ANIMATION ===
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

reveals.forEach((el) => observer.observe(el));


// === IMAGE MODAL ===

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.image-modal-close');
const nextBtn = document.querySelector('.image-modal-next');
const prevBtn = document.querySelector('.image-modal-prev');
const modalCounter = document.getElementById('modalCounter');

const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));

let currentIndex = 0;
let startX = 0;

// открыть модалку
function openModal(index) {
  currentIndex = index;
  updateImage();

  imageModal.style.display = 'flex';
  setTimeout(() => imageModal.classList.add('active'), 10);

  document.body.style.overflow = 'hidden';
}

// закрыть
function closeImageModal() {
  imageModal.classList.remove('active');

  setTimeout(() => {
    imageModal.style.display = 'none';
    document.body.style.overflow = '';
  }, 200);
}

// обновить картинку
function updateImage() {
  const img = galleryImages[currentIndex];
  if (!img) return;

  modalImage.src = img.src;
  modalImage.alt = img.alt || '';

  if (modalCounter) {
    modalCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }
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

// клики по картинкам
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

// закрытие
if (closeModal) {
  closeModal.addEventListener('click', closeImageModal);
}

// стрелки
if (nextBtn) nextBtn.addEventListener('click', nextImage);
if (prevBtn) prevBtn.addEventListener('click', prevImage);

// клик по фону
if (imageModal) {
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) closeImageModal();
  });
}

// клавиатура
document.addEventListener('keydown', (e) => {
  if (!imageModal || imageModal.style.display !== 'flex') return;

  if (e.key === 'Escape') closeImageModal();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// свайп (телефон)
if (imageModal) {
  imageModal.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  imageModal.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
  });
}
