<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
    default: "src/assets/index1.jpg",
  },
  book_name: {
    type: String,
    required: true,
  },
  book_grade: {
    type: Number,
    required: false,
  },
});
</script>

<template>
  <div class="book-wrapper">
    <v-card class="rounded-xl mx-2 mb-4 book-card">
      <v-img height="220px" cover :src="props.src"
        ><div v-if="props.book_grade" class="book-grade">
          {{ props.book_grade }}
        </div>
      </v-img>
      <v-card-title class="pb-0 text-body-1">
        {{ props.book_name }}
      </v-card-title>
      <v-card-subtitle class="text-caption">
        <v-chip to="/categories/action" rounded variant="tonal" link>
          Боевик
        </v-chip>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<style scoped>
*{
  opacity: 0;
}
.v-card-subtitle {
  padding: 0.5rem 1rem;
}
.book-wrapper {
  width: 180px;
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
