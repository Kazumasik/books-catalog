<script setup>
const props = defineProps({
  bookData: {
    type: Object,
    required: true,
  }
});
</script>
<template>
  <v-card class="rounded-lg">
    <v-card-item>
      <div class="update-card d-flex align-center">
        <v-img
          class="rounded-lg"
          src="https://remanga.org/media/titles/jiang-si/13c43b3cb4e9421de1e2af2f663402c6.jpg"
        >
        </v-img>
        <div class="update-content ml-4">
          <v-card-title> Господин Зомбі </v-card-title>
          <v-card-text> Том 1 Глава 2 </v-card-text>
          <v-card-subtitle>4 дні тому</v-card-subtitle>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>
<style scoped>
.v-card-text {
  padding: 0;
}
.v-img{
  max-width: 86px;
  width: 86px !important;
  height: 120px !important;
}
</style>
