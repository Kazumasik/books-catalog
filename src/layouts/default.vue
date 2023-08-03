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
const newTitleDialog = ref(false);
const newUserDialog = ref(false);
</script>

<template>
  <v-app id="inspire">
    <v-app-bar height="56" color="background" :order="1" flat>
      <v-container
        class="fill-height pa-0 d-flex align-center header-container"
      >
        <router-link to="/">
          <v-avatar
            v-ripple
            color="surface-variant"
            icon="mdi-book-open-variant"
            class="me-5"
            size="32"
          ></v-avatar>
        </router-link>
        <v-btn height="" to="/login" variant="text" class="text-body-1">
          Логин</v-btn
        >
        <v-btn height="" to="/" variant="text" class="text-body-1">
          Лента</v-btn
        >
        <v-btn height="" to="/FAQ" variant="text" class="text-body-1">
          Справка
        </v-btn>
        <v-spacer></v-spacer>
        <v-icon icon="mdi-cash-multiple"> </v-icon>
        <span class="ml-3"> 1233 руб </span>

        <!-- <v-btn
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
              rounded="lg"
              variant="tonal"
              class="pa-4"
              v-if="notifications?.length"
            >
              <p class="text-center text-h5">Уведомления</p>
              <VListItem
                @click="newTitleDialog = true"
                class="my-2"
                height="60px"
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
        </v-btn> -->
        <v-btn
          height="38px"
          width="38px"
          class="ml-6"
          color=""
          icon="mdi-plus-thick"
        >
          <v-icon size="28"> </v-icon>
          <VMenu activator="parent" location="bottom center" offset="25px">
            <VList
              @click="newUserDialog = true"
              rounded="lg"
              variant="tonal"
              class="pa-2"
            >
              <VListItem link="" rounded="lg" height="50px">
                <template #prepend>
                  <VIcon icon="mdi-account-plus" class="me-2" size="22" />
                </template>

                <VListItemTitle>Добавить сотрудника</VListItemTitle>
              </VListItem>
              <VListItem
                to="/admin/create-title"
                rounded="lg"
                height="50px"
                class="mt-2"
              >
                <template #prepend>
                  <VIcon icon="mdi-book-plus" class="me-2" size="22" />
                </template>

                <VListItemTitle>Добавить тайтл</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </v-btn>
        <ProfileButton class="ml-6" />
      </v-container>
    </v-app-bar>

    <v-main style="padding-top: 56px">
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
  <v-dialog v-model="newTitleDialog" width="auto">
    <v-card class="d-flex flex-row py-3 px-4" width="auto">
      <v-img
        width="150"
        cover
        class="rounded-lg"
        src="https://renovels.org/media/titles/main-characters-killed-by-me/ba421ed33f48715fdf075b5f8587064d.jpg"
      >
      </v-img>
      <div class="d-flex flex-column ml-5">
        <p class="text-h6">[Еженедельник]</p>
        <p class="text-h5 font-weight-bold mt-2">
          У меня есть зал героических душ
        </p>
        <div class="d-flex gap mt-3">
          <v-chip color="primary">Raide</v-chip>
          <v-chip color="success">Nicaea</v-chip>
          <v-chip>Выф</v-chip>
        </div>
        <div class="text-h7 mt-8">
          <span>Роль: <span class="text-primary">Тайпер</span> </span>
          <span class="ml-4">Ближайшая глава: 3 дня</span>
        </div>
        <div class="dialog-buttons d-flex mt-4">
          <v-btn height="" color="grey-darken-3" class="text-body-1">
            Remanga
          </v-btn>
          <v-spacer> </v-spacer>
          <v-btn height="" variant="outlined" class="text-body-1" color="error">
            Отказаться
          </v-btn>
          <v-btn height="" class="text-body-1 ml-4"> Принять </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog v-model="newTitleDialog" width="auto">
    <v-card class="d-flex flex-row py-3 px-4" width="auto">
      <v-img
        width="150"
        cover
        class="rounded-lg"
        src="https://renovels.org/media/titles/main-characters-killed-by-me/ba421ed33f48715fdf075b5f8587064d.jpg"
      >
      </v-img>
      <div class="d-flex flex-column ml-5">
        <p class="text-h6">[Еженедельник]</p>
        <p class="text-h5 font-weight-bold mt-2">
          У меня есть зал героических душ
        </p>
        <div class="d-flex gap mt-3">
          <v-chip color="primary">Raide</v-chip>
          <v-chip color="success">Nicaea</v-chip>
          <v-chip>Выф</v-chip>
        </div>
        <div class="text-h7 mt-8">
          <span>Роль: <span class="text-primary">Тайпер</span> </span>
          <span class="ml-4">Ближайшая глава: 3 дня</span>
        </div>
        <div class="dialog-buttons d-flex mt-4">
          <v-btn height="" color="grey-darken-3" class="text-body-1">
            Remanga
          </v-btn>
          <v-spacer> </v-spacer>
          <v-btn height="" variant="outlined" class="text-body-1" color="error">
            Отказаться
          </v-btn>
          <v-btn height="" class="text-body-1 ml-4"> Принять </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.header-container {
  max-width: 1280px;
  padding: 0;
}
</style>
