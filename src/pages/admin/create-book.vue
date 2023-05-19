<script setup>
import { onMounted, reactive } from "vue";
import { useGenreStore } from "@/stores/genre.js";
import { useBookStore } from "@/stores/book.js";
import router from '../../router'
const genreStore = useGenreStore();
const bookStore = useBookStore();
const genres = ref([]);
onMounted(async () => {
  genres.value = await genreStore.fetchAll();
});

const newBook = reactive({
  title: "",
  origTitle: "",
  description: "",
  genres: [],
});

const createBook = async () => {
  const response = await bookStore.createBook(newBook);
  console.log(response)
  router.replace('/book/'+ response._id)
};
</script>

<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-file-input label="Обкладинка книги" variant="outlined"></v-file-input>
      <v-text-field
        label="Назва українською"
        variant="outlined"
        v-model="newBook.title"
      ></v-text-field>
      <v-text-field
        label="Оригінальна назва"
        variant="outlined"
        v-model="newBook.origTitle"
      ></v-text-field>
      <v-textarea
        count
        no-resize
        variant="outlined"
        label="Опис"
        v-model="newBook.description"
      ></v-textarea>
      <v-combobox
        class="filter-row mb-4"
        multiple
        chips
        closable-chips
        :items="genres"
        item-title="name"
        item-value="_id"
        label="Жанри"
        variant="outlined"
        :hide-details="true"
        v-model="newBook.genres"
      ></v-combobox>
      <v-btn @click="createBook" class="w-100"> Створити книгу </v-btn>
    </v-sheet>
  </v-container>
</template>

<style lang="scss" scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
