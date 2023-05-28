<script setup>
import { onMounted, reactive } from "vue";
import { useGenreStore } from "@/stores/genre.js";
import { useBookStore } from "@/stores/book.js";
import router from "../../router";
const genreStore = useGenreStore();
const bookStore = useBookStore();
const genres = ref(genreStore.getGenres);

const newBook = reactive({
  image: [],
  title: "",
  origTitle: "",
  description: "",
  genres: [],
  content:[]
});

const createRules = {
  titleRules: [(v) => !!v || "Назва обов'язкова"],
  origTitleRules: [(v) => !!v || "Оригінальна назва обов'язкова"],
  genreRules: [(v) => !!v.length || "Жанр обов'язковий"],
  coverRules: [(v) => !!v || "Обкладинка обов'язкова"],
  contentRules: [(v) => !!v || "Контент обов'язковий"],
};
const createBook = async () => {
  const response = await bookStore.createBook(newBook);
  console.log(response);
  router.replace("/book/" + response._id);
};
</script>

<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-form @submit.prevent.stop="createBook">
        <v-file-input
          :rules="createRules.coverRules"
          accept="image/*"
          show-size
          v-model="newBook.image"
          label="Обкладинка книги"
          variant="outlined"
        ></v-file-input>
        <v-text-field
          :rules="createRules.titleRules"
          label="Назва українською"
          variant="outlined"
          v-model="newBook.title"
        ></v-text-field>
        <v-text-field
          :rules="createRules.origTitleRules"
          label="Оригінальна назва"
          variant="outlined"
          v-model="newBook.origTitle"
        ></v-text-field>
        <v-textarea
          persistent-counter
          maxLength="1000"
          auto-grow
          counter="1000"
          variant="outlined"
          label="Опис"
          v-model="newBook.description"
        ></v-textarea>
        <v-combobox
          :rules="createRules.genreRules"
          class="filter-row mt-4 mb-6"
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
        <v-file-input
          :rules="createRules.coverRules"
          accept=".doc,.docx"
          show-size
          v-model="newBook.content"
          label="Контент"
          variant="outlined"
        ></v-file-input>
        <v-btn type="submit" class="w-100"> Створити книгу </v-btn>
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
<route lang='yaml'>
meta:
  requiresAdmin: true
</route>