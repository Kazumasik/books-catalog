<script setup>
import { reactive } from "vue";

const genres = [
  "Бойовик",
  "Детектив",
  "Романтика",
  "Містика",
  "Фентезі",
  "Гумор",
];

const updatedBook = reactive({
  title:
    "Я - найжорстокіший клас підтримки - ⌈Диктор⌋, і я створю найсильніший клан у світі!",
  origTitle: "最凶の支援職【話術士】である俺は世界最強クランを従え",
  description:
    'Головний герой, Ноель, холоднокровний і розумний. У дитинстві він захоплювався своїм дідом - могутнім авантюристом, якого інші називали "Безсмертним". Ноель хотів стати таким самим, як і його дідусь, тому посилено тренувався. Однак виявилося, що його кваліфікація - диктор, найслабший клас за особистими бойовими показниками. Попри це Ноель не здається і продовжує наполегливо тренуватися. Одного разу на його рідне село нападають монстри і в нерівному бою дідусь Ноеля гине. Залишившись зовсім один, Ноель вирушає в жорстокий світ, сповнений обману і зради, щоб стати найсильнішим авантюристом.',
  genres: ["Бойовик", "Фентезі"],
});
</script>

<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-file-input label="Обкладинка книги" variant="outlined"></v-file-input>
      <v-text-field
        v-model="updatedBook.title"
        label="Назва українською"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="updatedBook.origTitle"
        label="Оригінальна назва"
        variant="outlined"
      ></v-text-field>
      <v-textarea
        v-model="updatedBook.description"
        count
        no-resize
        variant="outlined"
        label="Опис"
      ></v-textarea>
      <v-combobox
        v-model="updatedBook.genres"
        class="filter-row mb-4"
        multiple
        chips
        closable-chips
        :items="genres"
        label="Жанри"
        variant="outlined"
        :hide-details="true"
      >
      </v-combobox>
      <v-btn> Оновити інформацію </v-btn>
      <v-btn class="ml-4" color="error"> Видалити книгу </v-btn>
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
