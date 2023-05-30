<script setup>
import { useTheme } from "vuetify";
import { useUserStore } from "@/stores/user.js";
import { useBookStore } from "@/stores/book.js";
import LoginButton from "../components/header/LoginButton.vue";
import ProfileButton from "../components/header/ProfileButton.vue";
import router from "../router";
import { useRoute } from "vue-router";
const userStore = useUserStore();
const route = useRoute();
const bookStore = useBookStore();
const searchQuery = ref("");
const searchBook = async () => {
  router.replace(`/search?title=${searchQuery.value}`);
  searchQuery.value = "";
};
</script>

<template>
  <v-app id="inspire">
    <v-app-bar flat height="72px">
      <v-container class="fill-height d-flex align-center">
        <router-link to="/">
          <v-avatar class="me-5" color="grey-darken-1" size="40"></v-avatar>
        </router-link>
        <router-link to="/book">
          <v-btn variant="text"> Каталог </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <VTextField
          v-if="!(route.name === 'search')"
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="outlined"
          @keydown.enter.prevent="searchBook"
          :hide-details="true"
          class="mr-4"
        />
        <ProfileButton v-if="userStore.getToken" />
        <LoginButton v-else />
      </v-container>
    </v-app-bar>

    <v-main style="padding-top: 80px">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
