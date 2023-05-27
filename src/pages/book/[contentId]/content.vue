<script setup>
import { useBookStore } from "@/stores/book.js";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router from "../../../router";
const bookStore = useBookStore();
const bookContent = ref("");
const route = useRoute();

const page = ref(+route.query.page);

const totalPages = ref();

onBeforeMount(async () => {
  const response = await bookStore.getBookContent(
    route.params.contentId,
    page.value
  );
  bookContent.value = response.text;
  if (page) {
    totalPages.value = response.totalPages;
  }
});
watch(route, async (newValue, oldValue) => {
  console.log(newValue);
  const response = await bookStore.getBookContent(
    route.params.contentId,
    route.query.page
  );
  bookContent.value = response.text;
  if(route.query.page){
    page.value = response.currentPage
    totalPages.value = response.totalPages
  }
});

watch(page, async (newValue, oldValue) => {
  router.push({
    name: "book-contentId-content",
    query: { page: newValue },
    replace: false,
  });
  const response = await bookStore.getBookContent(
    route.params.contentId,
    page.value
  );
  bookContent.value = response.text;
});
</script>

<template>
  <v-container>
    <div class="book-content" v-html="bookContent"></div>
    <v-pagination
      v-if="route.query.page"
      class="mt-4"
      v-model="page"
      :length="totalPages"
      rounded="circle"
    ></v-pagination>
  </v-container>
</template>

<style scoped>
.book-content p {
  margin-bottom: 15px;
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
<route lang="yaml">
meta:
  layout: content
</route>
