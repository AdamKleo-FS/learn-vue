<script setup>
import { useArtistsStore } from '@/stores/artistsStore'
import { storeToRefs } from 'pinia'

const artistsStore = useArtistsStore()
const { artists, selectedArtists } = storeToRefs(artistsStore)

const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Genre', value: 'genre' },
]
</script>

<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="artists"
      show-select
      v-model="selectedArtists"
      item-value="id"
    />
  </v-container>
</template>
