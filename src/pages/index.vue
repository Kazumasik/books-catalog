<script setup>
import BookCard from "../components/BookCard.vue";
import UpdateCard from "../components/UpdateCard.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = (swiper) => {
  console.log("slide change");
  console.log(swiper);
};
</script>

<template>
  <Swiper
    slidesPerView="auto"
    :spaceBetween="5"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="n in 17" :key="n">
      <book-card
        book_name="Эволюция убйцы богов"
        src="src/assets/index.jpg"
      ></book-card>
    </swiper-slide>
    <swiper-slide v-for="n in 18" :key="n">
      <book-card book_name="Диктор лялялялялялялялял" src="src/assets/index1.jpg"></book-card>
    </swiper-slide>
  </Swiper>
  <v-container>
    <h4 class="text-h4">Горячі новинки</h4>
    <Swiper
      class="mt-4"
      slidesPerView="auto"
      :spaceBetween="5"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      >
      <swiper-slide v-for="n in 5" :key="n">
        <book-card
          book_name="Господин зомби"
          src="src/assets/index3.jpg"
        ></book-card>
      </swiper-slide>
      <swiper-slide v-for="n in 17" :key="n">
        <book-card
          book_name="Эволюция убйцы богов"
          src="src/assets/index.jpg"
        ></book-card>
      </swiper-slide>
      <swiper-slide v-for="n in 18" :key="n">
        <book-card book_name="Диктор" src="src/assets/index1.jpg"></book-card>
      </swiper-slide>
    </Swiper>
    <h4 class="text-h4 mt-4">Останні оновлення</h4>
    <update-card v-for="n in 29" :key="n" class="mt-4"></update-card>
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
