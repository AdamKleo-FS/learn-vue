import { defineStore } from 'pinia'

// Helper function for common field validation
function validateAlbumFields(album) {
  if (!album || typeof album !== 'object') {
    return "Invalid album data provided.";
  }
  if (!album.title || !album.title.trim()) {
    return "Album title cannot be empty.";
  }
  if (!album.artistId) {
    return "Please select an artist for the album.";
  }
  return "";
}

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [],
    selectedAlbums: [] 
  }),
  actions: {
    addAlbum(albumData) {
      const error = validateAlbumFields(albumData)
      if (error) {
        console.error(error)
        return
      }
      // Generate an id automatically (using timestamp here for simplicity)
      albumData.id = Date.now()
      this.albums.push(albumData)
    },
    removeAlbum(id) {
      this.albums = this.albums.filter(album => album.id !== id)
    },
    deleteSelectedAlbums() {
      this.albums = this.albums.filter(
        album => !this.selectedAlbums.includes(album.id)
      )
      this.selectedAlbums = []
    },
    updateAlbum(updatedAlbum) {
      const error = validateAlbumFields(updatedAlbum)
      if (error) {
        console.error(error)
        return
      }
      const index = this.albums.findIndex(album => album.id === updatedAlbum.id)
      if (index !== -1) {
        this.albums[index] = updatedAlbum
      }
    }
  }
})
