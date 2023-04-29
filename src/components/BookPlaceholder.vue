<script setup>
</script>

<template>
  <router-link to="/book" class="book-wrapper">
    <v-card link class="rounded-xl mx-2 mb-4 book-card">
      <v-img height="300px" cover >
      </v-img>
      <v-card-title class="pb-0 text-body-1"></v-card-title>
      <v-card-subtitle class="text-caption">
          <v-chip to="/categories/action" rounded variant="tonal" link>
            Боевик
          </v-chip>
      </v-card-subtitle>
    </v-card>
  </router-link>
</template>

<style scoped>
.v-card-subtitle{
  padding: 0.5rem 1rem;
}
a.book-wrapper {
  text-decoration: none !important;
  border: none !important;
  width: 200px;
  display: block;
  opacity: 0;
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
.book-card {
  text-decoration: none;
}
.v-img__img {
  height: 120px;
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
