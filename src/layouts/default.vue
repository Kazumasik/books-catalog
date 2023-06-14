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
    <v-app-bar :order="1" flat>
      <v-container class="fill-height py-0 d-flex align-center">
        <router-link to="/">
          <v-avatar v-ripple color="surface-variant"  icon="mdi-book-open-variant" class="me-5"  size="32"></v-avatar>
        </router-link>
        <router-link class="d-none d-sm-block" to="/book">
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
          class="d-none d-sm-block mr-4"
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
