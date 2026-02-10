import { fetchArtists, perPage } from './artistsApi.js';
import { renderArtists } from './artistsRenderer.js';
import { getDomElements } from './domElements.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function initArtApp() {
  const { listElement, loadMoreBtn, loader } = getDomElements();
  let currentPage = 1;
  let isLoading = false; // Флаг для предотвращения дублей

  async function loadAndRenderArtists() {
    if (isLoading) return; // Если загрузка уже идет — игнорируем новый вызов

    isLoading = true; // Блокируем новые вызовы

    if (loader) loader.classList.remove('is-hidden');
    if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');

    try {
      const data = await fetchArtists(currentPage);

      // Извлекаем массив артистов (учитываем разные форматы API)
      const artists = Array.isArray(data)
        ? data
        : data.results || data.artists || [];
      const totalPages = data.totalPages || 0;

      if (artists.length === 0) {
        if (currentPage === 1) {
          listElement.innerHTML = '<p>No artists found.</p>';
        }
        iziToast.info({ message: 'No artists found.' });
        return;
      }

      // Очищаем список ТОЛЬКО перед отрисовкой первой страницы
      if (currentPage === 1 && listElement) {
        listElement.innerHTML = '';
      }

      renderArtists(listElement, artists);

      // Логика кнопки Load More
      const canShowMore =
        artists.length === perPage &&
        (totalPages === 0 || currentPage < totalPages);
      if (loadMoreBtn) loadMoreBtn.classList.toggle('is-hidden', !canShowMore);

      // Плавный скролл для новых страниц
      if (currentPage > 1 && listElement?.firstElementChild) {
        const { height } =
          listElement.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Ошибка рендеринга:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      isLoading = false;
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
