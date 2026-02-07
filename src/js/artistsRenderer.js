export function createMarkup(artists) {
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
            <svg width="24" height="24"><use href="icon/symbol-defs.svg#icon-play3"></use></svg>
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
