<script setup></script>

<template>
<div style="height: 100%;" class="d-flex align-center">
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-file-input label="Обкладинка книги" variant="outlined"></v-file-input>
      <v-text-field label="Назва українською" variant="outlined"></v-text-field>
      <v-text-field label="Оригінальна назва" variant="outlined"></v-text-field>
      <v-textarea count no-resize variant="outlined" label="Опис"></v-textarea>
      <v-btn class="w-100"> Оновити інформацію </v-btn>
    </v-sheet>
  </v-container>
</div>
</template>

<style lang="scss" scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
