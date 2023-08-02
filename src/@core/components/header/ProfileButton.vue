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
    active=""
    color="grey-lighten-1"
    class="pa-0"
    height="38px"
    width="38px"
  >
      <v-icon icon="mdi-account-circle" size="25px"> </v-icon>
  </v-btn>
</template>
<style scoped>
.v-btn--size-default {
  min-width: inherit;
}
</style>
