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

  function openModal() {
    lastFocusedElement = document.activeElement;
    backdrop.hidden = false;
    backdrop.classList.add('active');
    backdrop.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

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

  async function sendFeedback(data) {
    const response = await fetch('https://sound-wave.b.goit.study/api/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      console.error('Server error:', result);
      throw new Error(result.message || 'Request failed');
    }
  }

  stars.addEventListener('click', e => {
    const value = e.target.dataset.value;
    if (!value) return;
    rating = Number(value);
    [...stars.children].forEach(star => {
      star.classList.toggle('active', Number(star.dataset.value) <= rating);
    });
  });


  form.addEventListener('submit', async e => {
    e.preventDefault();
    error.textContent = '';

    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message || !rating) {
      error.textContent = 'Please fill all fields and select a rating';
      return;
    }

    console.log('Submitting feedback:', { name, descr: message, rating });

    try {
      await sendFeedback({ name, descr: message, rating });
      closeModal();

      if (window.Notiflix) {
        Notiflix.Notify.success('Thank you for your feedback!');
      } else {
        alert('Thank you for your feedback!');
      }
    } catch (err) {
      console.error('Feedback error:', err);
      error.textContent = err.message;
      if (window.Notiflix) Notiflix.Notify.failure(err.message);
    }
  });

  
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !backdrop.hidden) closeModal(); });
}
