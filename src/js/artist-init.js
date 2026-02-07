import { fetchArtists, perPage } from './artistsApi.js';
import { renderArtists } from './artistsRenderer.js';
import { getDomElements } from './domElements.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function initArtApp() {
  const { listElement, loadMoreBtn, loader } = getDomElements();
  let currentPage = 1;

  async function loadAndRenderArtists() {
    if (loader) loader.classList.remove('is-hidden');
    if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');

    try {
      const data = await fetchArtists(currentPage);
      const artists = Array.isArray(data)
        ? data
        : data.results || data.artists || [];
      const totalPages = data.totalPages || 0;

      if (artists.length === 0) {
        iziToast.info({ message: 'No artists found.' });
        return;
      }

      renderArtists(listElement, artists);

      const canShowMore =
        artists.length === perPage &&
        (totalPages === 0 || currentPage < totalPages);

      if (loadMoreBtn) loadMoreBtn.classList.toggle('is-hidden', !canShowMore);

      if (currentPage > 1 && listElement && listElement.firstElementChild) {
        const { height } =
          listElement.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Помилка рендеру:', error);
      iziToast.error({ title: 'Error', message: error.message });
    } finally {
      if (loader) loader.classList.add('is-hidden');
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage += 1;
      loadAndRenderArtists();
    });
  }

  loadAndRenderArtists();
}
