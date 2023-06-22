<script setup>
import { reactive } from "vue";
import { useBookStore } from "@/stores/book.js";
import { useGenreStore } from "@/stores/genre.js";
import router from "../../../router";
const genreStore = useGenreStore();
const updatedBook = ref({});
const bookStore = useBookStore();
const route = useRoute();
const genres = ref(genreStore.getGenres);
const categories = ref(genreStore.getCategories);
const deleteDialog = ref(false);
const isLoading = ref({
  edit: false,
  delete: false,
});
const updateRules = {
  titleRules: [(v) => !!v || "Назва обов'язкова"],
};
onMounted(async () => {
  updatedBook.value = await bookStore.findById(route.params.id);
});

const updateBook = async () => {
  isLoading.value.edit = true;
  try {
    await bookStore.updateBook(updatedBook.value._id, updatedBook.value);
    router.replace("/book/" + updatedBook.value._id);
  } catch (err) {
    console.log(err);
  }
  isLoading.value.edit = false;
};

const deleteBook = async () => {
  isLoading.value.delete = true;
  try {
    await bookStore.deleteBook(updatedBook.value._id);
    router.replace("/");
  } catch (err) {
    console.log(err);
  }
  isLoading.value.delete = false;
};
</script>

<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-file-input
        v-model="updatedBook.image"
        label="Обкладинка книги"
        variant="outlined"
      ></v-file-input>
      <v-text-field
        :rules="updateRules.titleRules"
        v-model="updatedBook.title"
        label="Назва українською"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        class="mt-4"
        v-model="updatedBook.origTitle"
        label="Оригінальна назва"
        variant="outlined"
      ></v-text-field>
      <v-textarea
        class="mt-4"
        v-model="updatedBook.description"
        count
        no-resize
        variant="outlined"
        label="Опис"
      ></v-textarea>
      <v-combobox
        v-model="updatedBook.genres"
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
      >
      </v-combobox>
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
        :hide-details="true"
        v-model="updatedBook.categories"
      ></v-combobox>
      <v-file-input
        :rules="updatedBook.contentRules"
        accept=".doc,.docx"
        show-size
        v-model="updatedBook.content"
        label="Контент"
        variant="outlined"
      ></v-file-input>
      <v-btn :loading="isLoading.edit" @click="updateBook">
        Оновити інформацію
      </v-btn>
      <v-btn
        :loading="isLoading.delete"
        @click="deleteDialog = true"
        class="ml-4"
        color="error"
      >
        Видалити книгу
      </v-btn>
    </v-sheet>
  </v-container>
  <v-dialog v-model="deleteDialog" width="auto">
    <v-card>
      <v-card-title class="text-h5">
        Ви впевнені що хочете видалити цю книгу?
      </v-card-title>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="green-lighten-1" variant="text" @click="deleteBook">
          Так
        </v-btn>
        <v-btn
          color="red-lighten-1"
          variant="text"
          @click="deleteDialog = false"
        >
          ні
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
