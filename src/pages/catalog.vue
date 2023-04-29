<script setup>
import BookCard from "../components/BookCard.vue";
import BookPlaceholder from "../components/BookPlaceholder.vue";
import CatalogFilter from "../components/CatalogFilter.vue";
</script>

<template>
  <v-container>
    <h1 class="mb-4 mx-2">Каталог</h1>
    <div class="page-wrapper">
      <div class="catalog-wrapper">
        <book-card
          v-for="n in 5"
          :key="n"
          book_name="Эволюция убйцы богов"
          book_grade="9"
          src="src/assets/index.jpg"
          class="catalog-item"
        ></book-card>
        <book-card
          v-for="n in 5"
          :key="n"
          book_name="Я – самый жестокий класс поддержки – ⌈Диктор⌋, и я создам самый сильный клан в мире!"
          book_grade="7"
          src="src/assets/index1.jpg"
          class="catalog-item"
        ></book-card>
        <book-card
          v-for="n in 5"
          :key="n"
          book_name="Король-нежить ~Авантюрист низкого класса эволюционирует силой монстров и становится несокрушимым~"
          :book_grade="5.3"
          src="src/assets/index2.jpg"
          class="catalog-item"
        ></book-card>
        <book-placeholder
          v-for="n in 10"
          :key="n"
          class="catalog-item"
        ></book-placeholder>
      </div>
      <CatalogFilter></CatalogFilter>
    </div>
  </v-container>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: stretch;
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
