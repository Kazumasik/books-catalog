<script>
import BookCard from "../components/BookCard.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
    BookCard,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>

<template>
  <swiper
    :slides-per-view="10"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="n in 50" :key="n"
      ><book-card
        book_name="Эволюция убйцы богов"
        src="src/assets/index.jpg"
      ></book-card
    ></swiper-slide>
  </swiper>
  <v-container>
    <h1>Головна</h1>
    <v-row>
      <v-col xl="8" md="12" lg="10" sm="12" class="mx-auto">
        <v-card variant="outlined">
          <v-card-item>
            <v-card-title> Эволюция убийцы богов </v-card-title>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
