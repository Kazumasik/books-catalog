<script setup>
import BookCard from "../components/BookCard.vue";
import CatalogFilter from "../components/CatalogFilter.vue";
const bookmarks = ["Читаю", "Прочитав", "Буду читати"];
</script>

<template>
  <v-container>
    <div class="book-wrapper">
      <div class="first-column">
        <v-img
          class="rounded-xl mb-3"
          cover
          src="src/assets/index1.jpg"
        ></v-img>
        <v-btn class="mb-3"> Читати </v-btn>
        <v-select
          hide-details
          single-line
          label="Додати до закладок"
          :items="bookmarks"
          variant="solo"
        ></v-select>
      </div>
      <div class="second-column">2</div>
      <div class="third-column">
        <h4 class="mb-4">Автор</h4>
        <v-card color="#952175" theme="dark">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5"> Halcyon Days </v-card-title>

              <v-card-subtitle>Ellie Goulding</v-card-subtitle>

              <v-card-actions>
                <v-btn icon="mdi-play" variant="text"></v-btn>
              </v-card-actions>
            </div>

            <v-avatar size="125" rounded="0">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
              ></v-img>
            </v-avatar>
          </div>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
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
.first-column {
  position: sticky;
  top: 90px;
}
.second-column,
.third-column {
  background: #5d5d5d;
  height: 100px;
  flex-shrink: 0;
}
.first-column,
.third-column {
  width: 250px;
}
</style>
