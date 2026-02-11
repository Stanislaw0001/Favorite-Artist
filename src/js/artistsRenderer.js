import iconUrl from '../public/img/icon/artists-section.svg';

export function createMarkup(artists) {
  return artists
    .map(artist => {
      const {
        _id,
        strArtist,
        strArtistThumb,
        strBiographyEN,
        genres,
        genre,
        strGenre,
      } = artist;

      let genresList = ['Artist'];

      if (Array.isArray(genres) && genres.length > 0) {
        genresList = genres;
      } else if (strGenre) {
        genresList = [strGenre];
      } else if (genre) {
        genresList = [genre];
      }

      const biography = strBiographyEN || '';
      const shortDescription =
        biography.length > 300
          ? biography.substring(0, 300) + '...'
          : biography || 'No biography available for this artist.';

      return `
      <li class="artists__item artist-card">
        <div class="artist-card__img-thumb">
          <img src="${strArtistThumb}" alt="${strArtist}" class="artists__card--img" loading="lazy">
        </div>
        <div class="artist__card--content">
          <ul class="artist__card--genre-list">
            ${genresList
              .map(g => `<li class="artist__card--genre-item">${g}</li>`)
              .join('')}
          </ul>
          <h4 class="artist__card--name">${strArtist}</h4>
          <p class="artist__card--info">${shortDescription}</p>
          <button class="artist__card--btn" type="button" data-id="${_id}">
            Learn More 
            <svg width="24" height="24"><use href="img/icon/artists-section.svg#icon-play3"></use></svg>
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
