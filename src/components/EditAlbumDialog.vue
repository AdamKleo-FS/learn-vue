
<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'
import { useArtistsStore } from '@/stores/artistsStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  initialData: {
    type: Object,
    default: () => ({ title: '', artistId: '' })
  }
})
const emits = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const loading = ref(false)
const internalVisible = ref(props.modelValue)

// Get artists for dropdown
const artistsStore = useArtistsStore()
const { artists } = storeToRefs(artistsStore)

// Use a reactive object for the editable data
const newData = reactive({ ...props.initialData })

watch(
  () => props.modelValue,
  (newVal) => {
    internalVisible.value = newVal
    if (newVal) {
      Object.assign(newData, props.initialData)
    }
  }
)

watch(internalVisible, (val) => {
  emits('update:modelValue', val)
})

const confirm = () => {
  if (!newData.title.trim()) {
    alert("Album title cannot be empty")
    return
  }
  if (!newData.artistId) {
    alert("Please select an artist")
    return
  }
  loading.value = true
  // Simulate a loading delay
  setTimeout(() => {
    loading.value = false
    emits('confirm', { ...newData })
  }, 500)
}

const cancel = () => {
  emits('cancel')
  internalVisible.value = false
}
</script>



<template>
    <v-dialog v-model="internalVisible" max-width="500">
      <v-card class="mx-auto" elevation="1">
        <v-card-text>
          <div class="text-subtitle-1 font-weight-black mb-1">Edit Album</div>
  
          <v-text-field
            v-model="newData.title"
            label="Enter new album title"
            variant="outlined"
            single-line
          ></v-text-field>
  
          <v-select
            v-model="newData.artistId"
            label="Artist"
            :items="artists"
            item-text="name"
            item-value="id"
            outlined
          />
  
          <v-btn
            :disabled="loading"
            :loading="loading"
            class="text-none mb-4"
            color="indigo-darken-3"
            size="x-large"
            variant="flat"
            block
            @click="confirm"
          >
            Confirm
          </v-btn>
  
          <v-btn
            class="text-none"
            color="grey-lighten-3"
            size="x-large"
            variant="flat"
            block
            @click="cancel"
          >
            Cancel
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
