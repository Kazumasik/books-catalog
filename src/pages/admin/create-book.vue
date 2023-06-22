<script setup>
import { onMounted, reactive } from "vue";
import { useGenreStore } from "@/stores/genre.js";
import { useBookStore } from "@/stores/book.js";
import router from "../../router";
const genreStore = useGenreStore();
const bookStore = useBookStore();
const genres = ref(genreStore.getGenres);
const categories = ref(genreStore.getCategories);
const isLoading = ref(false);
const form = ref(null);
const newBook = reactive({
  image: [],
  title: "",
  origTitle: "",
  description: "",
  genres: [],
  categories: [],
  content: [],
});
const error = reactive({
  content: "",
  image: "",
});
const createRules = {
  titleRules: [(v) => !!v || "Назва обов'язкова"],
};
const createBook = async () => {
  if (!newBook.content.length) {
    error.content = "Контент обов'язковий";
    return;
  } else {
    error.content = "";
  }
  if (!newBook.image.length) {
    console.log(newBook.content);
    error.image = "Обкладинка книги обов'язкова";
    return;
  } else {
    error.image = "";
  }
  isLoading.value = true;
  try {
    const response = await bookStore.createBook(newBook);
    console.log(response);
    router.replace("/book/" + response._id);
  } catch (err) {
    console.log(err);
  }
  isLoading.value = false;
};
</script>

<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-form ref="form" @submit.prevent.stop="createBook">
        <v-file-input
          :rules="createRules.coverRules"
          accept="image/*"
          show-size
          v-model="newBook.image"
          label="Обкладинка книги"
          variant="outlined"
          :error-messages="error.image"
        ></v-file-input>
        <v-text-field
          class="mt-4"
          :rules="createRules.titleRules"
          label="Назва українською"
          variant="outlined"
          v-model="newBook.title"
        ></v-text-field>
        <v-text-field
          class="mt-4"
          label="Оригінальна назва"
          variant="outlined"
          v-model="newBook.origTitle"
        ></v-text-field>
        <v-textarea
          class="mt-4"
          persistent-counter
          maxLength="1000"
          auto-grow
          counter="1000"
          variant="outlined"
          label="Опис"
          v-model="newBook.description"
        ></v-textarea>
        <v-combobox
          class="filter-row mt-4 mb-6"
          multiple
          chips
          closable-chips
          :items="genres"
          item-title="name"
          item-value="_id"
          label="Жанри"
          variant="outlined"
          v-model="newBook.genres"
        ></v-combobox>
        <v-combobox
          class="filter-row mt-4 mb-6"
          multiple
          chips
          closable-chips
          :items="categories"
          item-title="name"
          item-value="_id"
          label="Категорії"
          variant="outlined"
          v-model="newBook.categories"
        ></v-combobox>
        <v-file-input
          :rules="createRules.contentRules"
          accept=".doc,.docx"
          show-size
          v-model="newBook.content"
          label="Контент"
          variant="outlined"
          :error-messages="error.content"
        ></v-file-input>
        <v-btn :loading="isLoading" type="submit" class="mt-4 w-100">
          Створити книгу
        </v-btn>
      </v-form>
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
<route lang="yaml">
meta:
  requiresAdmin: true
</route>
