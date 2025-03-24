<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({ name: '', genre: '' })
  }
});

const emits = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const loading = ref(false);
const internalVisible = ref(props.modelValue);

// Use a reactive object to hold both name and genre
const newData = reactive({ ...props.initialData });

// why dooes this work??
watch(
  () => props.modelValue,
  (newVal) => {
    internalVisible.value = newVal;
    if (newVal) {
      // ??
      Object.assign(newData, props.initialData);
    }
  }
);

watch(internalVisible, (val) => {
  emits('update:modelValue', val);
});

const confirm = () => {
  if (!newData.name.trim()) {
    alert("Artist name cannot be empty");
    return;
  }
  if (!newData.genre.trim()) {
    alert("Please select a genre");
    return;
  }
  loading.value = true;
  // Simulate a loading state before confirming
  setTimeout(() => {
    loading.value = false;
    emits('confirm', { ...newData });
  }, 500);
};

const cancel = () => {
  emits('cancel');
  internalVisible.value = false;
};
</script>


<template>
  <v-dialog v-model="internalVisible" max-width="500">
    <v-card class="mx-auto" elevation="1">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-black mb-1">Edit Artist</div>

        <v-text-field v-model="newData.name" label="Enter new artist name" variant="outlined"
          single-line></v-text-field>

        <v-select v-model="newData.genre" label="Genre" :items="['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical']"
          outlined />

        <v-btn :disabled="loading" :loading="loading" class="text-none mb-4" color="indigo-darken-3" size="x-large"
          variant="flat" block @click="confirm">
          Confirm
        </v-btn>

        <v-btn class="text-none" color="grey-lighten-3" size="x-large" variant="flat" block @click="cancel">
          Cancel
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>