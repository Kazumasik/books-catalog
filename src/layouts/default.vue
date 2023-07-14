<script setup>
import { useTheme } from "vuetify";
import ProfileButton from "@core/components/header/ProfileButton.vue";
import router from "../router";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const user = userStore.user;
const notifications = ref([
  {
    title: "Вам предложен новый тайтл",
  },
  {
    title: "Вам предложен новый тайтл",
  },
]);
const newTitleDialog = ref(true);
</script>

<template>
  <v-app id="inspire">
    <v-app-bar height="56" color="background" :order="1" flat>
      <v-container class="fill-height pa-0 d-flex align-center">
        <router-link to="/">
          <v-avatar
            v-ripple
            color="surface-variant"
            icon="mdi-book-open-variant"
            class="me-5"
            size="32"
          ></v-avatar>
        </router-link>
        <v-btn height="" to="/login" variant="text"> Логин</v-btn>
        <v-btn height="" to="/title/1" variant="text"> Тайтлы</v-btn>
        <v-btn height="" to="/" variant="text"> Лента</v-btn>
        <v-spacer></v-spacer>
        <v-icon icon="mdi-cash-multiple"> </v-icon>
        <span class="ml-3"> 1233 руб </span>

        <v-btn
          height="38px"
          width="38px"
          class="ml-6"
          color="grey-lighten-1"
          icon="mdi-bell"
        >
          <v-icon size="28"> </v-icon>
          <VMenu
            activator="parent"
            width="350"
            location="bottom center"
            offset="25px"
          >
            <VList
              rounded="xl"
              variant="tonal"
              class="pa-4"
              v-if="notifications?.length"
            >
              <p class="text-center text-h5">Уведомления</p>
              <VListItem
                @click="newTitleDialog = true"
                class="my-2"
                rounded="lg"
                v-for="notification in notifications"
                :key="notification.title"
                :value="notification.title"
              >
                <template #prepend>
                  <VIcon
                    icon="mdi-plus-box"
                    color="primary"
                    class="me-2"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ notification.title }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </v-btn>
        <ProfileButton class="ml-6" />
      </v-container>
    </v-app-bar>

    <v-main style="padding-top: 56px">
      <router-view></router-view>
    </v-main>
  </v-app>
  <v-dialog v-model="newTitleDialog" width="auto">
    <v-card class="d-flex flex-row py-3 px-4" width="auto">
      <v-img
        class="rounded-lg"
        width="200px"
        src="https://renovels.org/media/titles/main-characters-killed-by-me/ba421ed33f48715fdf075b5f8587064d.jpg"
      >
      </v-img>
      <div class="d-flex flex-column ml-5">
        <p class="text-h5 font-weight-bold">У меня есть зал героических душ</p>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1280px;
    padding: 0;
  }
}
</style>
