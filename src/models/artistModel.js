// ArtistModel.js
export function createArtist({ id = Date.now(), name = '', genre = '' } = {}) {
    return { id, name, genre };
}
  