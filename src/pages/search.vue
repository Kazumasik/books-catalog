<script setup>
import { useBookStore } from "@/stores/book.js";
import BookCard from "../components/BookCard.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const bookStore = useBookStore();
const title = ref(route.query.title || " ");
const books = ref({});
onMounted(async () => {
  if (route.query.title) {
    books.value = await bookStore.searchBook(title.value);
  }
});
const searchBook = async () => {
  books.value = await bookStore.searchBook(title.value);
};
</script>

<template>
  <v-container>
    <VTextField
      v-model="title"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      variant="outlined"
      @keydown.enter.prevent="searchBook"
      :hide-details="true"
      class="mr-4"
    />
    <div class="mt-4 search-results-wrapper">
      <book-card
        v-for="book in books"
        :key="book._id"
        :title="book.title"
        :book_grade="9"
        :url="book._id"
        :genre="book.genres[0]"
        src="https://remanga.org/media/titles/godkilling-oresamas-strongest-angels-evolution-story/f4a794f52152e3630834aae8702a9fbf.jpg"
        class="catalog-item"
      ></book-card>
    </div>
  </v-container>
</template>

<style scoped>
.search-results-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 5px;
  grid-template-areas:
    ". . . . ."
    ". . . . ."
    ". . . . .";
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
