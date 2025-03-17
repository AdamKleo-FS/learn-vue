<script setup>
import { reactive, ref, computed } from 'vue';
import { useArtistsStore } from '@/stores/artistsStore';
import { storeToRefs } from 'pinia';
import EditArtistDialog from './EditArtistDialog.vue';

// Artist store and reactive refs
const artistsStore = useArtistsStore();
const { selectedArtists, artists } = storeToRefs(artistsStore);

// State for adding a new artist
const newArtist = reactive({
  name: '',
  genre: ''
});

// State for editing an artist
const editDialog = ref(false);
const editedArtist = ref(null);

// Compute the initial data for the edit dialog (both name and genre)
const editedArtistData = computed(() => {
  return editedArtist.value
    ? { name: editedArtist.value.name, genre: editedArtist.value.genre }
    : { name: '', genre: '' };
});

``` Methods for adding, deleting, and editing artists ```
const onAddClick = () => {
  // Pass the whole object to the store method
  artistsStore.addArtist({ name: newArtist.name, genre: newArtist.genre });
  // Reset the model
  newArtist.name = '';
  newArtist.genre = '';
};

const onDeleteClick = () => {
  if (selectedArtists.value.length) {
    artistsStore.deleteSelectedArtists();
  } else {
    alert("Please select at least one artist to delete.");
  }
};

const onEditClick = () => {
  if (selectedArtists.value.length === 1) {
    const artistId = selectedArtists.value[0];
    const artist = artists.value.find(a => a.id === artistId);
    // Create a copy of the artist for editing
    editedArtist.value = { ...artist };
    editDialog.value = true;
  } else {
    alert("Please select one artist to edit.");
  }
};

const onConfirmEdit = (editedData) => {
  // Ensure both fields have values
  if (editedArtist.value && editedData.name.trim() && editedData.genre.trim()) {
    artistsStore.updateArtist({
      id: editedArtist.value.id,
      name: editedData.name.trim(),
      genre: editedData.genre.trim()
    });
  }
  editDialog.value = false;
  editedArtist.value = null;
};

const onCancelEdit = () => {
  editDialog.value = false;
  editedArtist.value = null;
};
</script>

<template>
  <v-container>
    <h2>Add Artist</h2>
    <v-form @submit.prevent="onAddClick">
      <v-text-field v-model="newArtist.name" label="Artist Name" />
      <v-select
        v-model="newArtist.genre"
        label="Genre"
        :items="['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical']"
        outlined
        />

      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn type="submit" icon="mdi-plus" size="small"></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn icon="mdi-delete" size="small" @click="onDeleteClick"></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn icon="mdi-open-in-new" size="small" @click="onEditClick"></v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Edit Artist Dialog now expects initialData with both name and genre -->
    <EditArtistDialog
      v-model="editDialog"
      :initialData="editedArtistData"
      @confirm="onConfirmEdit"
      @cancel="onCancelEdit"
    />
  </v-container>
</template>
