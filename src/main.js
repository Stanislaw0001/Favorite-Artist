import './js/header.js';
import { initArtApp } from '/js/artist-init.js';
import { initFeedbackModal } from './js/feedback-modal.js';
import { renderAndInitSwiper } from './js/feedbackRender.js';

document.addEventListener('DOMContentLoaded', () => {
  initArtApp();
  initFeedbackModal();
  renderAndInitSwiper();
});
