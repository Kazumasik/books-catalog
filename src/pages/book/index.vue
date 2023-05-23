<script setup>
import BookCard from "../../components/BookCard.vue";
import CatalogFilter from "../../components/CatalogFilter.vue";
import { useBookStore } from "@/stores/book.js";
import { useGenreStore } from "@/stores/genre.js";
import { useRoute } from "vue-router";
import router from "../../router";
import { computed, onUpdated, ref } from "vue";
const bookStore = useBookStore();
const genreStore = useGenreStore();
const books = ref([]);
const route = useRoute();
const totalPages = ref(1);
const genres = ref(genreStore.getGenres);
const queryGenres = Array.isArray(route.query.genre)
  ? route.query.genre.map((id) => ({ _id: id }))
  : route.query.genre
  ? [{ _id: route.query.genre }]
  : [];
const page = ref(+route.query.page || 1);
const fetchData = async (pageValue, selectedGenres = []) => {
  const response = await bookStore.fetchBooks(pageValue, selectedGenres);
  books.value = response.books;
  totalPages.value = response.totalPages;
};

onMounted(async () => {
  await fetchData(page.value, route.query.genre);
});
// watch(route.query, async (newValue, oldValue) => {
//   await fetchData(page.value, route.query.genre);
// });

watch(page, async (newValue, oldValue) => {
  router.push({
    name: "book",
    query: { ...route.query, page: newValue },
    replace: false,
  });
  await fetchData(newValue, route.query.genre);
});

const changeGenres = async (selectedGenres) => {
  selectedGenres = selectedGenres.map((genre) => genre._id);
  router.push({
    name: "book",
    query: { ...route.query, genre: [...selectedGenres] },
    replace: false,
  });
  await fetchData(page.value, selectedGenres);
};

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
            :src="book"
            class="catalog-item"
          ></book-card>
        </div>
        <v-pagination
          class="mt-4"
          v-model="page"
          :length="totalPages"
          rounded="circle"
        ></v-pagination>
      </div>
      <CatalogFilter
        :queryGenres="queryGenres"
        @changeGenres="changeGenres"
        :genres="genres"
        class="filter"
      ></CatalogFilter>
    </div>
  </v-container>
</template>

<style scoped>
.catalog-wrapper {
  flex-grow: 1;
}
.page-wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: stretch;
}

.books-wrapper {
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(5, minmax(0px, 1fr));
}

@media (max-width: 1919px) {
  .books-wrapper {
    grid-template-columns: repeat(5, minmax(0px, 1fr));
  }
}

@media (max-width: 1279px) {
  .books-wrapper {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}

@media (max-width: 799px) {
  .books-wrapper {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}

@media (max-width: 649px) {
  .filter {
    display: none;
  }
  .books-wrapper {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}

@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
