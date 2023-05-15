<script setup>
const genres = [
  "Бойовик",
  "Детектив",
  "Романтика",
  "Містика",
  "Фентезі",
  "Гумор",
];
</script>

<template>
    <v-container>
      <v-sheet class="pa-4 rounded-lg">
        <v-file-input
          label="Обкладинка книги"
          variant="outlined"
        ></v-file-input>
        <v-text-field
          label="Назва українською"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          label="Оригінальна назва"
          variant="outlined"
        ></v-text-field>
        <v-textarea
          count
          no-resize
          variant="outlined"
          label="Опис"
        ></v-textarea>
        <v-select
          class="filter-row mb-4"
          multiple
          chips
          closable-chips
          :items="genres"
          label="Жанри"
          variant="outlined"
          :hide-details="true"
        ></v-select>
        <v-btn class="w-100"> Створити книгу </v-btn>
      </v-sheet>
    </v-container>

</template>

<style lang="scss" scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
