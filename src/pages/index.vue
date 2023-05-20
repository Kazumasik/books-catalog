<script setup>
import BookCard from "../components/BookCard.vue";
import UpdateCard from "../components/UpdateCard.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
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
    <!-- <Swiper
      class="mt-4"
      slidesPerView="auto"
      :spaceBetween="5"
    >
      <swiper-slide v-for="n in 5" :key="n">
        <book-card
          book_name="Господин зомбі"
          src="https://remanga.org/media/titles/jiang-si/13c43b3cb4e9421de1e2af2f663402c6.jpg"
        ></book-card>
      </swiper-slide>
      <swiper-slide v-for="n in 5" :key="n">
        <book-card
          book_name="Еволюція вбивці богів"
          src="https://remanga.org/media/titles/godkilling-oresamas-strongest-angels-evolution-story/f4a794f52152e3630834aae8702a9fbf.jpg"
        ></book-card>
      </swiper-slide>
      <swiper-slide v-for="n in 5" :key="n">
        <book-card book_name="Диктор" src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"></book-card>
      </swiper-slide>
    </Swiper> -->
    <h4 class="text-h4 mt-4">Останні оновлення</h4>
    <update-card v-for="n in 10" :key="n" class="mt-4"></update-card>
  </v-container>
</template>

<style scoped>
.swiper-slide {
  width: auto;
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
