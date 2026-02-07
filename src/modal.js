const modalBackdrop = document.querySelector('.artists-modal-backdrop');
const modalCloseBtn = document.querySelector('.artists-modal-window-btn');
const loader = document.querySelector('.loader');

export const showLoader = () => {
  loader.classList.remove('is-hidden-modal-loader');
};

export const hideLoader = () => {
  loader.classList.add('is-hidden-modal-loader');
};

document.addEventListener('click', e => {
    const btn = e.target.closest('.artist__card--btn');
    if (!btn) {
        return
    }
    const artistsIdOpenModal = btn.dataset.id;
    openArtistsModal(artistsIdOpenModal);
})

 export const openArtistsModal = artistsIdOpenModal => {
    modalBackdrop.classList.remove('is-hidden-modal');
    document.body.style.overflow = 'hidden';

    showLoader()
 }

export const closeArtistModal = () => {
    modalBackdrop.classList.add('is-hidden-modal');
    document.body.style.overflow = '';

    hideLoader();
}

modalCloseBtn.addEventListener('click', closeArtistModal);
modalBackdrop.addEventListener('click', ev => {
  if (ev.target === modalBackdrop) {
    closeArtistModal();
  }
});
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape' &&
    !modalBackdrop.classList.contains('is-hidden-modal')) {
    closeArtistModal();
  }
});
