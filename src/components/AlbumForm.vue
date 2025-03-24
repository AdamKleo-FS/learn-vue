<script setup>
import { reactive, computed } from 'vue'
import { useAlbumsStore } from '@/stores/albumsStore'
import { useArtistsStore } from '@/stores/artistsStore'
import { storeToRefs } from 'pinia'

const albumsStore = useAlbumsStore()
const artistsStore = useArtistsStore()
const { artists } = storeToRefs(artistsStore)

// Compute artist options for the select
const artistOptions = computed(() =>
  artists.value.map(artist => ({
    id: artist.id,
    name: artist.name
  }))
)

// Reactive state for the new album
const newAlbum = reactive({
  title: '',
  artistId: null
})

// Handler to add a new album
const onAddClick = () => {
  if (!newAlbum.title.trim()) {
    alert("Album title cannot be empty.")
    return
  }
  if (!newAlbum.artistId) {
    alert("Please select an artist.")
    return
  }
  albumsStore.addAlbum({ title: newAlbum.title, artistId: newAlbum.artistId })
  newAlbum.title = ''
  newAlbum.artistId = null
}
</script>


<template>
  <v-container>
    <v-form @submit.prevent="onAddClick">
      <v-text-field v-model="newAlbum.title" label="Album Title" />

      <v-select
        v-model="newAlbum.artistId"
        label="Artist"
        :items="artistOptions"
        item-text="name"
        item-value="id"
        outlined
      />

      <v-row align="center" justify="center" class="mt-4">
        <v-col cols="auto">
          <v-btn type="submit" icon="mdi-plus" size="small"></v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>


