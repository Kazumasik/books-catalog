<script setup>
import { watch } from "vue";

const props = defineProps({
  genres: {
    type: Array,
    required: true,
  },
   queryGenres: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['changeGenres'])
const selectedGenres = ref(JSON.parse(JSON.stringify(props.queryGenres)))
watch(selectedGenres, (newValue, oldValue) => {
  emit('changeGenres', JSON.parse(JSON.stringify(newValue)))
});
</script>

<template>
  <div class="ml-3 filter-wrapper">
    <h4 class="mb-4">Фільтри</h4>
    <v-combobox
      class="filter-row mb-4"
      multiple
      chips
      closable-chips
      :items="props.genres"
      item-title="name"
      item-value="_id"
      label="Жанри"
      variant="outlined"
      v-model="selectedGenres"
      :hide-details="true"
    ></v-combobox>
    <h4 class="mb-4">Рік випуску</h4>
    <div class="d-flex publish-year mb-4">
      <v-text-field
        class="mr-2"
        :hide-details="true"
        label="Від"
        variant="outlined"
      >
      </v-text-field>
      <v-text-field
        class="ml-2"
        :hide-details="true"
        label="До"
        variant="outlined"
      >
      </v-text-field>
    </div>
  </div>
</template>
<style scoped>
.filter-row {
  display: block;
  flex: 0;
}
.publish-year {
  justify-content: space-between;
}
.publish-year .v-text-field {
  flex-basis: 50%;
}
.filter-wrapper {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
</style>
