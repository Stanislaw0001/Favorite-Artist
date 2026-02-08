import './js/header.js';
import { initArtApp } from './js/artist-init.js';
import { initFeedbackModal } from './js/feedback-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initArtApp();
  initFeedbackModal();
});
