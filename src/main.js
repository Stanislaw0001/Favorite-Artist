import './js/header.js';
import "./js/hero.js";
import { initArtApp } from './js/artist-init.js';
import './js/artist-modal-handler.js';

initArtApp();
import { initFeedbackModal } from './js/feedback-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initArtApp();
  initFeedbackModal();
});
