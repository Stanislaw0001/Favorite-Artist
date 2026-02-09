import { fetchArtistById, fetchArtistAlbums } from './artistsApi.js';
import { showLoader, hideLoader } from './loader.js';

const modalBackdrop = document.querySelector('.artists-modal-backdrop');
const modalCloseBtn = document.querySelector('.artists-modal-window-btn');
const modalContent = document.querySelector('.artists-modal-window-content');

export async function openArtistsModal(artistId) {
  if (!modalBackdrop || !modalContent) return;

  modalBackdrop.classList.remove('is-hidden-modal');
  document.body.style.overflow = 'hidden';
  modalContent.innerHTML = '<p>Loading...</p>';

  showLoader();

  try {
    const [artist, albums] = await Promise.all([
      fetchArtistById(artistId),
      fetchArtistAlbums(artistId),
    ]);

    renderArtistModal(artist, albums);
  } catch (err) {
    modalContent.innerHTML = `<p>Failed to load artist data.</p>`;
    console.error(err);
  } finally {
    hideLoader();
  }
}

function renderArtistModal(artist) {
  if (!artist) return;

  const yearsActive = artist.intFormedYear
    ? artist.intDiedYear
      ? `${artist.intFormedYear} - ${artist.intDiedYear}`
      : `${artist.intFormedYear} - present`
    : 'Information missing';

  const albums = {};
  artist.tracksList?.forEach(track => {
    if (!albums[track.strAlbum]) albums[track.strAlbum] = [];
    albums[track.strAlbum].push(track);
  });

  modalContent.innerHTML = `
    <h2 class="artist-name">${artist.strArtist}</h2>
    <div class="conteiner-img-paragraphs">
    <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" class="artist-img" />
    <div class="artist-name-paragraphs-bio-genges">
    <div class="artist-name-paragraphs">
    <p class="artist-modal-meta-paragraphs"><strong>Years Active</strong> ${yearsActive}</p>
    <p class="artist-modal-meta-paragraphs"><strong>Sex</strong> ${artist.strGender || 'Information missing'}</p>
    <p class="artist-modal-meta-paragraphs"><strong>Members</strong> ${artist.intMembers || 'Information missing'}</p>
    <p class="artist-modal-meta-paragraphs"><strong>Country</strong> ${artist.strCountry || 'Information missing'}</p>
    </div>
    
    
    <div class="container-bio-genges">
    <p class="artist-modal-meta-paragraphs biography-text"><strong>Biography</strong> ${artist.strBiographyEN || 'No biography available'}</p>
    <ul class="artist-genres">
      ${artist.genres?.map(genre => `<li class="artist-genres-list">${genre}</li>`).join('') || 'No genres available'}
    </ul>
    </div>
    </div>
    </div>


    <h3 class="albums-section-title">Albums</h3>
    <div class="albums-container">
      ${Object.entries(albums)
        .map(
          ([albumName, tracks]) => `
        <div class="album">
          <h4 class="album-title">${albumName}</h4>
          <ul class="album-tracks">
            <li class="album-tracks-header">
              <span>Track</span>
              <span>Time</span>
              <span>Link</span>
            </li>
            ${tracks
              .map(
                track => `
              <li class="track">
  <span>${track.strTrack}</span>
  <span>${track.intDuration ? formatDuration(parseInt(track.intDuration)) : '-'}</span>
  ${
    track.movie
      ? `
        <a href="${track.movie}" target="_blank" class="track-link" aria-label="YouTube">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5933 7.20301C21.4794 6.78041 21.2568 6.39501 20.9477 6.08518C20.6386 5.77534 20.2537 5.55187 19.8313 5.43701C18.2653 5.00701 12.0003 5.00001 12.0003 5.00001C12.0003 5.00001 5.73633 4.99301 4.16933 5.40401C3.74725 5.52415 3.36315 5.75078 3.0539 6.06214C2.74464 6.3735 2.52062 6.75913 2.40333 7.18201C1.99033 8.74801 1.98633 11.996 1.98633 11.996C1.98633 11.996 1.98233 15.26 2.39233 16.81C2.62233 17.667 3.29733 18.344 4.15533 18.575C5.73733 19.005 11.9853 19.012 11.9853 19.012C11.9853 19.012 18.2503 19.019 19.8163 18.609C20.2388 18.4943 20.6241 18.2714 20.934 17.9622C21.2439 17.653 21.4677 17.2682 21.5833 16.846C21.9973 15.281 22.0003 12.034 22.0003 12.034C22.0003 12.034 22.0203 8.76901 21.5933 7.20301ZM9.99633 15.005L10.0013 9.00501L15.2083 12.01L9.99633 15.005Z"/>
          </svg>
        </a>
      `
      : '<span></span>'
  }
</li>
            `
              )
              .join('')}
          </ul>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}

function formatDuration(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function renderTracks(tracks) {
  const tracksContainer = document.querySelector('.album-tracks');

  tracks.forEach(track => {
    const trackDuration = formatDuration(track.intDuration);
    const trackLink = track.movie
      ? `<a href="${track.movie}" target="_blank">YouTube</a>`
      : 'No link';

    const trackHTML = `
      <li class="track">
        <span>${track.strTrack}</span>
        <span>${trackDuration}</span>
        <span class="track-link">${trackLink}</span>
      </li>
    `;

    tracksContainer.insertAdjacentHTML('beforeend', trackHTML);
  });
}

// Закриття модалки
export function closeArtistModal() {
  modalBackdrop.classList.add('is-hidden-modal');
  document.body.style.overflow = '';
  modalContent.innerHTML = '';
}

modalCloseBtn.addEventListener('click', closeArtistModal);
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeArtistModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeArtistModal();
});
