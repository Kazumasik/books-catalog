<script setup>
import BookCard from "../components/BookCard.vue";
import BookPlaceholder from "../components/BookPlaceholder.vue";
const tab = ref(null);
</script>

<template>
  <v-container>
    <div class="profile-header mx-2">
      <div class="profile-avatar">
        <v-avatar size="120">
          <v-img src="src/assets/geas.jpg"></v-img>
        </v-avatar>
      </div>
      <div class="profile-header-content ml-4">
        <h1 class="mb-4">Maxim4ik</h1>
        <v-btn append-icon="mdi-pencil"> Налаштування </v-btn>
      </div>
    </div>
  </v-container>
  <v-divider></v-divider>
  <v-container>
    <v-tabs v-model="tab" class="mb-4 mx-2">
      <v-tab value="reading">Читаю</v-tab>
      <v-tab value="read">Прочитав</v-tab>
      <v-tab value="will-read">Буду читати</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="reading">
        <div class="catalog-wrapper">
          <book-card
            v-for="n in 12"
            :key="n"
            book_name="Диктор"
            :book_grade="2"
            src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"
            class="catalog-item"
          ></book-card>
          <book-placeholder
            v-for="n in 10"
            :key="n"
            class="catalog-item"
          ></book-placeholder>
        </div>
      </v-window-item>
      <v-window-item value="read">
        <div class="catalog-wrapper">
          <book-card
            v-for="n in 3"
            :key="n"
            book_name="Нежить"
            :book_grade="2"
            src="https://remanga.org/media/titles/undead-king-an-adventurer-at-the-bottom-evolutionary-warriors-with-the-power-of-demons/691e549f4674e228c46a07cc2c3be1dd.jpg"
            class="catalog-item"
          ></book-card>
          <book-placeholder
            v-for="n in 10"
            :key="n"
            class="catalog-item"
          ></book-placeholder></div
      ></v-window-item>
      <v-window-item value="will-read"> </v-window-item>
    </v-window>
  </v-container>
</template>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
.profile-avatar {
  flex-basis: 15%;
}
.profile-header {
  display: flex;
  align-items: center;
}

.catalog-wrapper {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.catalog-item,
.book-placeholder {
  flex: 1 0 auto;
}
.book-placeholder {
  width: 200px;
}
</style>
