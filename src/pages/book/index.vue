<script setup>
import BookCard from "../../components/BookCard.vue";
import BookPlaceholder from "../../components/BookPlaceholder.vue";
import CatalogFilter from "../../components/CatalogFilter.vue";
import { useBookStore } from "@/stores/book.js";
import { useGenreStore } from "@/stores/genre.js";
import { useRoute } from "vue-router";
import router from "../../router";
import { ref } from "vue";
const bookStore = useBookStore();
const genreStore = useGenreStore();
const books = ref([]);
const route = useRoute();
const totalPages = ref(1);
const genres = ref([]);
console.log(route.query.genre)
const queryGenres = ref(route.query.genre ? route.query.genre.map((id) =>({_id: id})) : []);
console.log(queryGenres.value)
const page = ref(+route.query.page || 1);
const fetchData = async (pageValue, selectedGenres = []) => {
  const response = await bookStore.fetchBooks(pageValue, selectedGenres);
  books.value = response.books;
  totalPages.value = response.totalPages;
};

onMounted(async () => {
  await fetchData(page.value, route.query.genre);
  genres.value = await genreStore.fetchAll();
});

watch(page, async (newValue, oldValue) => {
  router.push({ name: "book", query: { ...route.query, page: newValue }, replace: false });
  await fetchData(newValue, route.query.genre);
});

const changeGenres = async (selectedGenres) => {
  selectedGenres = selectedGenres.map((genre) => genre._id);
  router.push({
    name: "book",
    query: { ...route.query, genre: [...selectedGenres]},
    replace: false,
  });
  console.log(selectedGenres);
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
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 5px;
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
</style>
