import { openArtistsModal } from './artists-modal.js';

document.addEventListener('click', e => {
  const btn = e.target.closest('.artist__card--btn');
  if (!btn) return;

  const artistId = btn.dataset.id;
  if (!artistId) return;

  openArtistsModal(artistId);
});
