export function initFeedbackModal() {
  const openBtn = document.querySelector('.js-open-feedback');
  const backdrop = document.querySelector('.js-feedback-backdrop');

  if (!openBtn || !backdrop) return;

  const closeBtn = backdrop.querySelector('.js-close-feedback');
  const form = backdrop.querySelector('.js-feedback-form');
  const stars = backdrop.querySelector('.js-rating');
  const error = backdrop.querySelector('.js-feedback-error');
  const loader = backdrop.querySelector('.js-feedback-loader');

  let rating = 0;

  function openModal() {
    backdrop.classList.add('active');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('active');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    form.reset();
    rating = 0;
    [...stars.children].forEach(star =>
      star.classList.remove('active')
    );
    error.textContent = '';
  }

  async function sendFeedback(data) {
    const response = await fetch(
      'https://sound-wave.b.goit.study/api/feedbacks',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Request failed');
    }
  }

  stars.addEventListener('click', e => {
    const value = e.target.dataset.value;
    if (!value) return;

    rating = Number(value);

    [...stars.children].forEach(star => {
      star.classList.toggle(
        'active',
        Number(star.dataset.value) <= rating
      );
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    error.textContent = '';

    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message || !rating) {
      error.textContent =
        'Please fill all fields and select a rating';
      return;
    }

    try {
      loader.classList.remove('hidden');

      await sendFeedback({
        name,
        message,
        rating,
      });

      closeModal();
      Notify.success('Thank you for your feedback!');
    } catch (err) {
      Notify.failure(err.message);
    } finally {
      loader.classList.add('hidden');
    }
  });

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });
}
