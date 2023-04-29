<script setup>
const genres = [
  "Бойовик",
  "Детектив",
  "Романтика",
  "Містика",
  "Фентезі",
  "Гумор",
];
const status = ["В процесі", "Закінчений"];
</script>

<template>
    <div class="ml-3 filter-wrapper">
        <h4 class="mb-4">Фільтри</h4>
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
        <v-select
          class="filter-row mb-4"
          clearable
          :items="status"
          label="Статус проекта"
          variant="outlined"
          :hide-details="true"
        ></v-select>
        <h4 class="mb-4">Рік випуску</h4>
        <div class="d-flex publish-year mb-4">
            <v-text-field class="mr-2" :hide-details="true" label="Від" variant="outlined">

            </v-text-field>
            <v-text-field class="ml-2" :hide-details="true" label="До" variant="outlined">

            </v-text-field>
        </div>
      </div>
</template>
<style scoped>
.filter-row {
  display: block;
  flex: 0;
}
.publish-year{
  justify-content: space-between;
}
.publish-year .v-text-field {
  flex-basis: 50%;
}
.filter-wrapper {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
</style>