// твой код (оставляем как есть)
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach((el) => observer.observe(el));


// === ДОБАВЬ ВОТ ЭТО НИЖЕ ===

// элементы модалки
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.image-modal-close');

// клик по картинкам
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    imageModal.style.display = 'flex';
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    document.body.style.overflow = 'hidden';
  });
});

// закрытие по крестику
closeModal.addEventListener('click', () => {
  imageModal.style.display = 'none';
  document.body.style.overflow = '';
});

// закрытие по фону
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) {
    imageModal.style.display = 'none';
    document.body.style.overflow = '';
  }
});
