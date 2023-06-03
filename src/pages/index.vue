<script setup>
import BookCard from "../components/BookCard.vue";
import UpdateCard from "../components/UpdateCard.vue";
import { useBookStore } from "@/stores/book.js";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const bookStore = useBookStore();
const newBooks = ref({});
onMounted(async () => {
  newBooks.value = await bookStore.fetchNewBooks();
});

const breakPoints = {
  1: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  200: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  400: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  600: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  760: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
  960: {
    slidesPerView: 6,
    spaceBetween: 10,
  },
  1280: {
    slidesPerView: 7,
    spaceBetween: 10,
  },
};
</script>

<template>
  <!-- <Swiper
    slidesPerView="auto"
    :spaceBetween="5"
  >
    <swiper-slide v-for="n in 10" :key="n">
      <book-card
        book_name="Еволюція вбивці богів богов"
        src="https://remanga.org/media/titles/godkilling-oresamas-strongest-angels-evolution-story/f4a794f52152e3630834aae8702a9fbf.jpg"
      ></book-card>
    </swiper-slide>
    <swiper-slide v-for="n in 10" :key="n">
      <book-card
        book_name="Диктор лялялялялялялялял"
        src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"
      ></book-card>
    </swiper-slide>
  </Swiper> -->
  <v-container>
    <h4 class="text-h4">Горячі новинки</h4>
    <Swiper
      :breakpoints="breakPoints"
      class="mt-4"
      :slides-per-view="4"
      :space-between="10"
    >
      <swiper-slide v-for="book in newBooks" :key="book._id">
        <book-card
          :title="book.title"
          :url="book._id"
          :genre="book.genres[0]"
          :src="book"
        ></book-card>
      </swiper-slide>
    </Swiper>
    <h4 class="text-h4 mt-4">Останні оновлення</h4>
    <update-card v-for="n in 10" :key="n" class="mt-4"></update-card>
  </v-container>
</template>

<style scoped>
/* .swiper-slide {
  width: auto;
} */
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
