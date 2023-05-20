<script setup>
import BookCard from "../../components/BookCard.vue";
import BookPlaceholder from "../../components/BookPlaceholder.vue";
import CatalogFilter from "../../components/CatalogFilter.vue";
import { useBookStore } from "@/stores/book.js";
import { useRoute } from "vue-router";
import router from "../../router";
const bookStore = useBookStore();
const books = ref([]);
const route = useRoute();
const totalPages = ref(1);
const page = ref(+route.query.page);
onMounted(async () => {
  const response = await bookStore.fetchBooks(page);
  books.value = response.books;
  totalPages.value = response.totalPages;
  page.value = response.page;
});

watch(page, async (newValue, oldValue) => {
  router.push({query: { page: newValue}, replace: false });
  const response = await bookStore.fetchBooks(newValue);
  books.value = response.books;
  totalPages.value = response.totalPages;
});
</script>

<template>
  <v-container>
    <h1 class="mb-4 mx-2">Каталог</h1>
    <div class="page-wrapper">
      <div class="catalog-wrapper">
        <div class="books-wrapper">
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
        <v-pagination
          v-model="page"
          :length="totalPages"
          rounded="circle"
        ></v-pagination>
      </div>
      <CatalogFilter class="filter"></CatalogFilter>
    </div>
  </v-container>
</template>

<style scoped>
.catalog-wrapper{
  flex-grow: 1;
}
.page-wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: stretch;
}

.books-wrapper {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 15px;
  grid-auto-flow: row;
  grid-template-areas:
    ". . . . . . ."
    ". . . . . . ."
    ". . . . . . .";
}
@media (max-width: 1919px) {
  .books-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 5px;
    grid-template-areas:
      ". . . . ."
      ". . . . ."
      ". . . . .";
  }
}
@media (max-width: 1279px) {
  .books-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 5px;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . .";
  }
}

@media (max-width: 799px) {
  .books-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 5px;
    grid-template-areas:
      ". ."
      ". ."
      ". .";
  }
}
@media (max-width: 649px) {
  .filter {
    display: none;
  }
  .books-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 5px;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . .";
  }
}
.catalog-item,
.book-placeholder {
  flex: 1 0 auto;
}
</style>
