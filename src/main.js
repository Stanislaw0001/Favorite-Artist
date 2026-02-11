import './js/header.js';
import './js/hero.js';
import { initArtApp } from './js/artist-init.js';
import './js/artist-modal-handler.js';

import { initFeedbackModal } from './js/feedback-modal.js';
import { renderAndInitSwiper } from './js/feedbackRender.js';

document.addEventListener('DOMContentLoaded', () => {
  initArtApp();
  initFeedbackModal();
  renderAndInitSwiper();
});
