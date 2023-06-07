<script setup>
import { useTheme } from "vuetify";
import { useUserStore } from "@/stores/user.js";
import { useBookStore } from "@/stores/book.js";
import LoginButton from "../components/header/LoginButton.vue";
import ProfileButton from "../components/header/ProfileButton.vue";
import router from "../router";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const userStore = useUserStore();
const bookStore = useBookStore();
const props = ref(null);
const route = useRoute();
const infiniteMode = ref(route.query.page ? false : true);

watch(infiniteMode, async (newValue, oldValue) => {
  if (newValue) {
    router.push({
      name: "book-contentId-content",
      replace: false,
    });
  } else if (!newValue) {
    router.push({
      name: "book-contentId-content",
      query: { page: 1 },
      replace: false,
    });
  }
});
</script>

<template>
  <v-app id="inspire">
    <v-app-bar scroll-behavior="collapse" flat height="72px">
      <v-container class="fill-height d-flex align-center">
        <router-link to="/">
          <v-avatar class="me-5" color="grey-darken-1" size="40"></v-avatar>
        </router-link>
        <router-link class="d-none d-sm-block"  to="/book">
          <v-btn variant="text"> Каталог </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-switch
          v-model="infiniteMode"
          class="read-mode mr-4"
          hide-details
          label="Все одразу"
        ></v-switch>
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
@media (max-width: 599px) {
  .catalog-button {
    display: none;
  }
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
.read-mode {
  flex: inherit !important;
}
</style>
