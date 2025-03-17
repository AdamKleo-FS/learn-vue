// artistsStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createArtist } from '@/models/artistModel';

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

export const useArtistsStore = defineStore('artists', () => {
  const artists = ref([
    createArtist({ id: 1, name: 'Taylor Swift', genre: 'Pop' }),
    createArtist({ id: 2, name: 'The Beatles', genre: 'Rock' }),
    createArtist({ id: 3, name: 'Beyoncé', genre: 'R&B/Pop' }),
    createArtist({ id: 4, name: 'Metallica', genre: 'Metal' })
  ]);

  const selectedArtists = ref([]);

  const addArtist = (artistData) => {
    // Validate common fields
    const error = validateArtistFields(artistData);
    if (error) {
      console.error(error);
      return;
    }
    const newArtist = createArtist(artistData);

    artists.value.push(newArtist);
  };

  const removeArtist = (id) => {
    artists.value = artists.value.filter(artist => artist.id !== id);
  };

  const deleteSelectedArtists = () => {
    artists.value = artists.value.filter(
      artist => !selectedArtists.value.includes(artist.id)
    );
    selectedArtists.value = [];
  };

  const updateArtist = (updatedArtist) => {
    // Validate common fields
    const error = validateArtistFields(updatedArtist);
    if (error) {
      console.error(error);
      return;
    }

    const index = artists.value.findIndex(artist => artist.id === updatedArtist.id);
    if (index !== -1) {
      artists.value[index] = updatedArtist;
    }
  };

  return { artists, selectedArtists, addArtist, removeArtist, deleteSelectedArtists, updateArtist };
});
