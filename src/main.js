import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://sound-wave.b.goit.study/api';
const perPage = 4;
let currentPage = 1;

const listElement = document.querySelector('.artists__list');
const loadMoreBtn = document.querySelector('.artists__button');
const loader = document.querySelector('.loader-backdrop');

export async function fetchArtists(page) {
  const response = await fetch(
    `${BASE_URL}/artists?page=${page}&limit=${perPage}`
  );
  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
}

function createMarkup(artists) {
  return artists
    .map(({ _id, strArtist, strArtistThumb, genres, strBiographyEN }) => {
      const biography = strBiographyEN || '';
      const shortDescription =
        biography.length > 300
          ? biography.substring(0, 300) + '...'
          : biography;

      return `
      <li class="artists__item artist-card">
        <div class="artist-card__img-thumb">
          <img src="${strArtistThumb}" alt="${strArtist}" class="artists__card--img" loading="lazy">
        </div>
        <div class="artist__card--content">
          <ul class="artist__card--genres">
            ${genres.map(genre => `<li class="artist__card--genre">${genre}</li>`).join('')}
          </ul>
          <h4 class="artist__card--name">${strArtist}</h4>
          <p class="artist__card--info">${shortDescription}</p>
          <button class="artist__card--btn" type="button" data-id="${_id}">
            Learn More 
            <svg width="24" height="24"><use href="../icon/symbol-defs.svg#icon-play3"></use></svg>
          </button>
        </div>
      </li>`;
    })
    .join('');
}

async function loadAndRenderArtists() {
  loader.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

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

    const markup = createMarkup(artists);
    listElement.insertAdjacentHTML('beforeend', markup);
    if (
      artists.length === perPage &&
      (totalPages === 0 || currentPage < totalPages)
    ) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
    }

    if (currentPage > 1) {
      const { height: cardHeight } =
        listElement.firstElementChild.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    console.error('Помилка рендеру:', error);
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    loader.classList.add('is-hidden');
  }
}

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  loadAndRenderArtists();
});

loadAndRenderArtists();
