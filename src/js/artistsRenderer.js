import iconSprite from '../public/icon/symbol-defs.svg';

export function createMarkup(artists) {
  return artists
    .map(({ _id, strArtist, strArtistThumb, genres, strBiographyEN }) => {
      // 1. Сначала объявляем биографию
      const biography = strBiographyEN || '';

      // 2. ТЕПЕРЬ создаем shortDescription (важно, чтобы это было внутри .map)
      const shortDescription =
        biography.length > 300
          ? biography.substring(0, 300) + '...'
          : biography;

      // 3. Возвращаем строку разметки
      return `
      <li class="artists__item artist-card">
        <div class="artist-card__img-thumb">
          <img src="${strArtistThumb}" alt="${strArtist}" class="artists__card--img" loading="lazy">
        </div>
        <div class="artist__card--content">
          <ul class="artist__card--genre-list">
            ${genres.map(genre => `<li class="artist__card--genre-item">${genre}</li>`).join('')}
          </ul>
          <h4 class="artist__card--name">${strArtist}</h4>
          <p class="artist__card--info">${shortDescription}</p>
          <button class="artist__card--btn" type="button" data-id="${_id}">
            Learn More 
            <svg width="24" height="24"><use href="${iconSprite}#icon-play3"></use></svg>
          </button>
        </div>
      </li>`;
    })
    .join('');
}

export function renderArtists(listElement, artists) {
  if (!listElement) return;
  const markup = createMarkup(artists);
  listElement.insertAdjacentHTML('beforeend', markup);
}
