const BASE_URL = 'https://sound-wave.b.goit.study/api';
const perPage = 8;
let currentPage = 1;

const listElement = document.querySelector('.artists__list');
const loadMoreBtn = document.querySelector('.artists__button');

export async function fetchArtists(page) {
  const response = await fetch(
    `${BASE_URL}/artists?page=${page}&limit=${perPage}`
  );
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
  return data.artists;
}

function createMarkup(artists) {
  return artists
    .map(({ _id, strArtist, strArtistThumb, genres, strBiographyEN }) => {
      const biography = strBiographyEN || '';
      const shortDescription =
        biography.length > 70 ? biography.substring(0, 70) + '...' : biography;

      return `
        <li class="artists__item artist-card">
          <div class="artist-card__img-thumb">
            <img src="${strArtistThumb}" alt="${strArtist}" class="artists__card--img" width="288" height="177">
          </div>
          <div class="artist__card--content">
            <ul class="artist__card--genres">
              ${genres.map(genre => `<li class="artist__card--genre">${genre}</li>`).join('')}
            </ul>
            <h4 class="artist__card--name">${strArtist}</h4>
            <p class="artist__card--info">${shortDescription}</p>
            <button class="artist__card--btn" type="button" data-id="${_id}">
              Learn More 
              <svg width="24" height="24"><use href="./images/sprite.svg#icon-arrow-right"></use></svg>
            </button>
          </div>
        </li>
      `;
    })
    .join('');
}

async function loadAndRenderArtists() {
  loadMoreBtn.disabled = true;
  const originalText = loadMoreBtn.textContent;
  loadMoreBtn.textContent = 'Loading...';

  try {
    const artists = await fetchArtists(currentPage);

    if (!artists || artists.length === 0) {
      loadMoreBtn.classList.add('is-hidden');
      return;
    }

    listElement.insertAdjacentHTML('beforeend', createMarkup(artists));

    if (currentPage > 1) {
      const { height: cardHeight } =
        listElement.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 1.5,
        behavior: 'smooth',
      });
    }

    if (artists.length < perPage) {
      loadMoreBtn.classList.add('is-hidden');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = originalText;
  }
}

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  loadAndRenderArtists();
});

loadAndRenderArtists();
