<script setup>
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const user = userStore.user;
const notifications = ref([
  {
    title: "Диктор",
    role: "Клинер",
  },
  {
    title: "Диктор",
    role: "Клинер",
  },
]);
</script>
<template>
  <v-btn
    :to="`/user/${userStore.user.id}`"
    color="grey-lighten-1"
    class="pa-0"
    height="38px"
    width="38px"
  >
    <VAvatar size="34" style="cursor: pointer">
      <VImg
        src="https://renovels.org/media/publishers/geas-novels/high_cover.jpg"
      />
      <!-- !SECTION -->
    </VAvatar>
  </v-btn>
</template>
<style scoped>
.v-btn--size-default {
  min-width: inherit;
}
</style>
