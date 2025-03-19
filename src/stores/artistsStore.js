// artistsStore.js
import { defineStore } from 'pinia';


// Helper function for common field validation
function validateArtistFields(artist) {
  if (!artist || typeof artist !== 'object') {
    return "Invalid artist data provided.";
  }
  if (!artist.name || !artist.name.trim()) {
    return "Artist name cannot be empty.";
  }
  if (!artist.genre || !artist.genre.trim()) {
    return "Artist genre cannot be empty.";
  }
  return ""; // empty string means validation passed
}

export const useArtistsStore = defineStore('artists', {
    state: () => ({
        // Define your state properties here
        artists: [],
        selectedArtists: [] // Include the selectedArtists ref here
      }),

  actions: {
    addArtist(artistData) {
      // Validate common fields
      const error = validateArtistFields(artistData);
      if (error) {
        console.error(error);
        return;
      }

      this.artists.push(artistData);
    },

    removeArtist(id) {
      this.artists = this.artists.filter(artist => artist.id !== id);
    },

    deleteSelectedArtists() {
      this.artists = this.artists.filter(
        artist => !this.selectedArtists.includes(artist.id)
      );
      this.selectedArtists = [];
    },

    updateArtist(updatedArtist) {
      // Validate common fields
      const error = validateArtistFields(updatedArtist);
      if (error) {
        console.error(error);
        return;
      }

      const index = this.artists.findIndex(artist => artist.id === updatedArtist.id);
      if (index !== -1) {
        this.artists[index] = updatedArtist;
      }
    }
  }
});
