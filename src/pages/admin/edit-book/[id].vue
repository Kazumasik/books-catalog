<script setup>
import { reactive } from "vue";
import { useBookStore } from "@/stores/book.js";
import { useGenreStore } from "@/stores/genre.js";
import router from "../../../router";
const genreStore = useGenreStore();
const updatedBook = ref({});
const bookStore = useBookStore();
const route = useRoute();
const genres = ref([]);

const deleteDialog = ref(false)

onMounted(async () => {
  updatedBook.value = await bookStore.findById(route.params.id);
  genres.value = await genreStore.fetchAll();
});

const updateBook = async () => {
  await bookStore.updateBook(updatedBook.value._id, updatedBook.value);
  router.replace("/book/" + updatedBook.value._id);
};

const deleteBook = async () => {
  await bookStore.deleteBook(updatedBook.value._id);
  router.replace("/");
};
</script>

<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-file-input label="Обкладинка книги" variant="outlined"></v-file-input>
      <v-text-field
        v-model="updatedBook.title"
        label="Назва українською"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="updatedBook.origTitle"
        label="Оригінальна назва"
        variant="outlined"
      ></v-text-field>
      <v-textarea
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
      <v-btn @click="updateBook"> Оновити інформацію </v-btn>
      <v-btn @click="deleteDialog = true" class="ml-4" color="error">
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
        <v-spacer>

        </v-spacer>
        <v-btn color="green-lighten-1" variant="text" @click="deleteBook">
          Так
        </v-btn>
        <v-btn color="red-lighten-1" variant="text" @click="deleteDialog = false">
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
