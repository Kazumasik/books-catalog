<script setup>
import { useBookStore } from "@/stores/book.js";
import BookCard from "../components/BookCard.vue";
import { useRoute } from "vue-router";
import router from "../router";
const route = useRoute();
const bookStore = useBookStore();
const title = ref(route.query.title || "");
const books = ref({});
onMounted(async () => {
  if (route.query.title) {
    books.value = await bookStore.searchBook(title.value);
  }
});
const searchBook = async () => {
  router.push({
    name: "search",
    query: { title: title.value },
    replace: false,
  });
  books.value = await bookStore.searchBook(title.value);
};
</script>

<template>
  <v-container>
    <VTextField
      placeholder="Що шукаєте?"
      v-model="title"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      variant="outlined"
      @keydown.enter.prevent="searchBook"
      :hide-details="true"
    />
    <div class="mt-4 search-results-wrapper">
      <book-card
        v-for="book in books"
        :key="book._id"
        :title="book.title"
        :book_grade="book.averageRating"
        :url="book._id"
        :genre="book.genres[0]"
        :src="book"
      ></book-card>
    </div>
  </v-container>
</template>

<style scoped>
.search-results-wrapper {
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(6, minmax(0px, 1fr));
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
