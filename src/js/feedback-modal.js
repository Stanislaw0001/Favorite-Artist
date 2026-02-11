export function initFeedbackModal() {
  const openBtn = document.querySelector('.js-open-feedback');
  const backdrop = document.querySelector('.js-feedback-backdrop');

  if (!openBtn || !backdrop) return;

  const closeBtn = backdrop.querySelector('.js-close-feedback');
  const form = backdrop.querySelector('.js-feedback-form');
  const stars = backdrop.querySelector('.js-rating');
  const error = backdrop.querySelector('.js-feedback-error');

  let rating = 0;
  let lastFocusedElement = null;

  // ---- Открытие модалки ----
  function openModal() {
    lastFocusedElement = document.activeElement;
    backdrop.hidden = false;
    backdrop.classList.add('active');
    backdrop.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  // ---- Закрытие модалки ----
  function closeModal() {
    backdrop.classList.remove('active');
    backdrop.hidden = true;
    backdrop.setAttribute('inert', '');
    document.body.style.overflow = '';
    form.reset();
    rating = 0;
    [...stars.children].forEach(star => star.classList.remove('active'));
    error.textContent = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // ---- Отправка данных на сервер ----
  async function sendFeedback(data) {
    try {
      const response = await fetch('https://sound-wave.b.goit.study/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Сервер вернул 400 или другую ошибку
        throw new Error(result.message || 'Ошибка при отправке отзыва');
      }

      return result.message || '';
    } catch (err) {
      throw new Error(err.message || 'Ошибка сети');
    }
  }

  // ---- Всплывающее уведомление ----
  function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `feedback-notification ${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add('visible'), 10);

    setTimeout(() => {
      notif.classList.remove('visible');
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }

  // ---- Выбор рейтинга ----
  stars.addEventListener('click', e => {
    const star = e.target.closest('[data-value]');
    if (!star) return;

    rating = Number(star.dataset.value);
    [...stars.children].forEach(s => {
      s.classList.toggle('active', Number(s.dataset.value) <= rating);
    });
  });

  // ---- Отправка формы ----
  form.addEventListener('submit', async e => {
    e.preventDefault();
    error.textContent = '';

    const name = form.name.value.trim();
    const message = form.message.value.trim();

    // Проверка всех полей
    if (!name || !message || rating === 0) {
      error.textContent = 'Заполните все поля и выберите рейтинг';
      return;
    }

    // Проверка данных перед отправкой
    const feedbackData = {
      name,
      descr: message, // сервер требует именно "descr"
      rating,
    };

    try {
      console.log('Отправляем на сервер:', feedbackData);
      await sendFeedback(feedbackData);
      closeModal();
      showNotification('Спасибо за ваш отзыв!');
    } catch (err) {
      console.error('Ошибка при отправке отзыва:', err);
      error.textContent = err.message;
      showNotification(err.message, 'error');
    }
  });

  // ---- События открытия/закрытия модалки ----
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !backdrop.hidden) closeModal();
  });
}
