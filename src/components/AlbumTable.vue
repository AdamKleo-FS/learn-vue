<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="tableAlbums"
      show-select
      v-model="selectedAlbums"
      item-value="id"
    />

    <v-row align="center" justify="center" class="mt-4">
      <v-col cols="auto">
        <v-btn icon="mdi-delete" size="small" @click="onDeleteClick"></v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn icon="mdi-open-in-new" size="small" @click="onEditClick"></v-btn>
      </v-col>
    </v-row>

    <EditAlbumDialog
      v-model="editDialog"
      :initialData="editedAlbumData"
      @confirm="onConfirmEdit"
      @cancel="onCancelEdit"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlbumsStore } from '@/stores/albumsStore'
import { useArtistsStore } from '@/stores/artistsStore'
import { storeToRefs } from 'pinia'
import EditAlbumDialog from './EditAlbumDialog.vue'

// Albums store and refs
const albumsStore = useAlbumsStore()
const { albums, selectedAlbums } = storeToRefs(albumsStore)

// Artists store and refs (for artist name lookup)
const artistsStore = useArtistsStore()
const { artists } = storeToRefs(artistsStore)

// Define table headers
const headers = [
  { title: 'Title', value: 'title' },
  { title: 'Artist', value: 'artistName' }
]

// Helper: get artist name by id
const getArtistName = (artistId) => {
  const artist = artists.value.find(a => a.id === artistId)
  return artist ? artist.name : 'Unknown'
}

// Compute table data with additional artistName field
const tableAlbums = computed(() =>
  albums.value.map(album => ({
    ...album,
    artistName: getArtistName(album.artistId)
  }))
)

// Edit dialog and editing state
const editDialog = ref(false)
const editedAlbum = ref(null)
const editedAlbumData = computed(() => {
  return editedAlbum.value
    ? { title: editedAlbum.value.title, artistId: editedAlbum.value.artistId }
    : { title: '', artistId: null }
})

// Handler to delete selected albums
const onDeleteClick = () => {
  if (selectedAlbums.value.length) {
    albumsStore.deleteSelectedAlbums()
  } else {
    alert("Please select at least one album to delete.")
  }
}

// Handler to edit an album (requires exactly one selection)
const onEditClick = () => {
  if (selectedAlbums.value.length === 1) {
    const albumId = selectedAlbums.value[0]
    const album = albums.value.find(a => a.id === albumId)
    editedAlbum.value = { ...album }
    editDialog.value = true
  } else {
    alert("Please select one album to edit.")
  }
}

// Handler for confirming an edit
const onConfirmEdit = (editedData) => {
  if (editedAlbum.value && editedData.title.trim() && editedData.artistId) {
    albumsStore.updateAlbum({
      id: editedAlbum.value.id,
      title: editedData.title.trim(),
      artistId: editedData.artistId
    })
  }
  editDialog.value = false
  editedAlbum.value = null
}

// Handler for cancelling an edit
const onCancelEdit = () => {
  editDialog.value = false
  editedAlbum.value = null
}
</script>
