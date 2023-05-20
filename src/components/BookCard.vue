<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
    default: "src/assets/index1.jpg",
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  book_grade: {
    type: Number,
    required: false,
  },
  genre: {
    type: Object,
    required: false,
  },
});
</script>

<template>
  <router-link :to="`/book/${props.url}`" class="book-wrapper">
    <v-card class="rounded-xl mx-2 mb-4 book-card">
      <v-img cover :src="props.src"
        ><div v-if="props.book_grade" class="book-grade">
          {{ props.book_grade }}
        </div>
      </v-img>
      <v-card-title class="pb-0 text-body-1">
        {{ props.title }}
      </v-card-title>
      <v-card-subtitle class="text-caption">
        <v-chip to="/categories/action" rounded variant="tonal" link>
          {{ props.genre.name }}
        </v-chip>
      </v-card-subtitle>
    </v-card>
  </router-link>
</template>

<style scoped>
.v-card-subtitle {
  padding: 0.5rem 1rem;
}
a.book-wrapper {
  display: block;
}
.book-grade {
  position: absolute;
  z-index: 100;
  padding: 4px 10px;
  bottom: 0px;
  border-top-right-radius: 10px;
  background-color: rgba(255, 152, 0, 0.7);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-card-title {
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: normal !important;
}
</style>
