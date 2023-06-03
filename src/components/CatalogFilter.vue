<script setup>
import { watch } from "vue";
import { useGenreStore } from "@/stores/genre.js";
const genreStore = useGenreStore();
const props = defineProps({
  genres: {
    type: Array,
    required: true,
  },
  queryGenres: {
    type: Array,
    required: true,
  },
  queryCategories: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});
const transformGenres = (idArray) => {
  return idArray.map((obj) => {
    const categoryId = obj._id;
    const categoryObj = genreStore.getGenres.find(
      (category) => category._id === categoryId
    );
    const categoryName = categoryObj.name;

    return {
      _id: categoryId,
      name: categoryName,
      __v: 0,
    };
  });
};

const transformCategories = (idArray) => {
  return idArray.map((obj) => {
    const categoryId = obj._id;
    const categoryObj = genreStore.getCategories.find(
      (category) => category._id === categoryId
    );
    const categoryName = categoryObj.name;

    return {
      _id: categoryId,
      name: categoryName,
      __v: 0,
    };
  });
};
const emit = defineEmits(["changeGenres", "changeCategories"]);
const selectedCategories = ref(transformCategories(props.queryCategories));
const selectedGenres = ref(transformGenres(props.queryGenres));
watch(selectedGenres, (newValue, oldValue) => {
  emit(
    "changeGenres",
    JSON.parse(JSON.stringify(newValue)),
    JSON.parse(JSON.stringify(selectedCategories.value))
  );
});
watch(selectedCategories, (newValue, oldValue) => {
  emit(
    "changeCategories",
    JSON.parse(JSON.stringify(selectedGenres.value)),
    JSON.parse(JSON.stringify(newValue))
  );
});
</script>

<template>
  <div class="ml-3 filter-wrapper">
    <h4 class="mb-4">Фільтри</h4>
    <v-combobox
      class="filter-row"
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
    <v-combobox
      class="filter-row mt-4"
      multiple
      chips
      closable-chips
      :items="props.categories"
      item-title="name"
      item-value="_id"
      label="Категорії"
      variant="outlined"
      v-model="selectedCategories"
      :hide-details="true"
    ></v-combobox>
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
