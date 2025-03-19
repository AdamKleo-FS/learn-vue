<template>
  <v-main>
    <v-col class="d-flex justify-center">
      <v-switch
        v-model="isAlbums"
        inset
        label=""
      />
    </v-col>
    <router-view />
  </v-main>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isAlbums = ref(false)

// Set default based on current route
onMounted(() => {
  if (route.path === '/AlbumsPage') {
    isAlbums.value = true
  } else if (route.path === '/ArtistsPage') {
    isAlbums.value = false
  }
})

// Watch the switch value and navigate accordingly
watch(isAlbums, (newValue) => {
  if (newValue) {
    router.push('/AlbumsPage')
  } else {
    router.push('/ArtistsPage')
  }
})
</script>
