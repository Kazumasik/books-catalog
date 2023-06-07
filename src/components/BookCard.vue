<script setup>
const props = defineProps({
  src: {
    type: Object,
    required: true,
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

const imageUrl = import.meta.env.VITE_BASE_URL +"/"+props.src.imageUrl
</script>

<template>
    <v-card :to="`/book/${props.url}`" class="rounded-xl book-card">
      <v-img cover :src="imageUrl"
        ><div v-if="props.book_grade" class="book-grade">
          {{ props.book_grade }}
        </div>
      </v-img>
      <v-card-title class="pb-0 text-body-1">
        {{ props.title }}
      </v-card-title>
      <v-card-subtitle class="text-caption">
        <v-chip rounded variant="tonal" link>
          {{ props.genre.name }}
        </v-chip>
      </v-card-subtitle>
    </v-card>
</template>

<style scoped>
.v-card-subtitle {
  padding: 0.5rem 1rem;
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
.v-img {
  height: 0;
  padding-top: 140%; /* Задает высоту в зависимости от ширины родительского элемента */
  position: relative;
}
.v-card-title {
  min-height: 41px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: normal !important;
}
</style>
