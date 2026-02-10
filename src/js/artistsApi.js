export const BASE_URL = 'https://sound-wave.b.goit.study/api';
export const perPage = 4;

export async function fetchArtists(page) {
  const response = await fetch(
    `${BASE_URL}/artists?page=${page}&limit=${perPage}`
  );
  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
}

export async function fetchArtistById(artistId) {
  const response = await fetch(`${BASE_URL}/artists/${artistId}`);
  if (!response.ok) throw new Error('Failed to fetch artist');
  return await response.json();
}

export async function fetchArtistAlbums(artistId) {
  return [];
}
