<script setup>
import BookCard from "../components/BookCard.vue";
import CatalogFilter from "../components/CatalogFilter.vue";
const bookmarks = ["Читаю", "Прочитав", "Буду читати"];
</script>

<template>
  <v-container>
    <div class="book-wrapper">
      <div class="first-column">
        <div class="first-column-wrapper">
          <v-img
            class="rounded-xl mb-3"
            cover
            src="src/assets/index1.jpg"
          ></v-img>
          <v-btn class="mb-3"> Читати </v-btn>
          <v-select
          class="elevation-0"
            hide-details
            single-line
            label="Додати до закладок"
            :items="bookmarks"
            variant="solo"
          ></v-select>
        </div>
      </div>
      <div class="second-column">2</div>
      <div class="third-column">
        <p class="author mb-4">Автор</p>
        <router-link to="/author">
          <v-card variant="text">
            <div class="d-flex">
              <v-avatar size="56" class="rounded-lg">
                <v-img cover src="src/assets/geas.jpg"></v-img>
              </v-avatar>
              <v-card-title class="d-flex"> Geas </v-card-title>
            </div>
          </v-card>
        </router-link>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.v-card-title {
  font-size: 1rem;
  align-items: center;
}
.author {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2;
}
.bookmark-selector
  .v-field.v-field--appended.v-field--single-line.v-field--variant-solo.v-theme--dark {
  border-radius: 100px;
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
.first-column .v-btn {
  width: 100%;
}
.book-wrapper {
  display: flex;
  justify-content: space-between;
  height: 100000px;
  position: relative;
}
.first-column-wrapper {
  position: sticky;
  top: 90px;
}
.second-column {
  background: #5d5d5d;
  height: 100px;
  flex-shrink: 0;
}
.first-column,
.third-column {
  width: 250px;
}
</style>
