<script setup>
import { onMounted, reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRoute } from "vue-router";
const userStore = useUserStore();
const route = useRoute();
const user = ref({});
const isYourProfile = ref(+route.params.id === userStore.user.id);
const subroles = ref([]);
const tab = ref("one");
const statuses = ref(["Марафон", "Онгоинг", "Хватит", "Отпуск"]);
const selection = ref();
onMounted(async () => {
  const response = await userStore.findById(route.params.id);
  user.value = response.content;
  subroles.value = user.value.subroles.map((subrole) => subrole.name);
  console.log(subroles.value);
});
</script>

<template>
  <v-container>
    <div class="profile d-flex">
      <div class="profile-info d-flex flex-column">
        <v-card
          variant="flat"
          height="340"
          width="320"
          class="d-flex justify-center flex-column align-center"
        >
          <v-avatar color="surface" size="166">
            <v-img
              src="https://remanga.org/media/users/44887/avatar_GA9ed7N.jpg"
            ></v-img>
          </v-avatar>
          <v-card-title class="text-center mt-4 text-h4 font-weight-bold">
            {{ user.username }}
          </v-card-title>
          <div class="d-flex gap mt-4">
            <v-chip link rounded="pill" variant="tonal">
              {{ user.balance + " руб" }}
            </v-chip>
            <v-btn
              rounded="pill"
              variant="tonal"
              color="grey-lighten-2"
              class="h-auto text text-capitalize"
            >
              <v-avatar color="grey-lighten-2" class="mr-4" size="18">
              </v-avatar>
              Статуc
              <v-menu offset="5px" location="bottom center" activator="parent">
                <v-list width="105" rounded="lg" bg-color="grey-darken-3">
                  <v-list-item link v-for="status in statuses" :key="status">
                    <v-list-item-title>{{ status }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </div>
        </v-card>
        <v-item-group
          mandatory="force"
          class="d-flex flex-column"
          v-model="selection"
        >
          <v-item v-slot="{ isSelected, toggle }">
            <v-btn
              :color="isSelected ? 'primary' : 'grey-lighten-1'"
              class="mt-4 text-capitalize"
              prepend-icon="mdi-bookmark-outline"
              :variant="isSelected ? 'outlined' : 'tonal'"
              height="55"
              rounded="lg"
              @click="toggle"
            >
              <template v-slot:prepend>
                <v-icon size="x-large"></v-icon>
              </template>
              <span class="text-left"> Тайтлы </span>
            </v-btn>
          </v-item>
          <v-item v-slot="{ isSelected, toggle }">
            <v-btn
              @click="toggle"
              :color="isSelected ? 'primary' : 'grey-lighten-1'"
              :variant="isSelected ? 'outlined' : 'tonal'"
              class="mt-4 text-capitalize"
              prepend-icon="mdi-cog-outline"
              height="55"
              rounded="lg"
            >
              <template v-slot:prepend>
                <v-icon size="x-large"></v-icon>
              </template>
              Настройки
            </v-btn>
          </v-item>
        </v-item-group>
      </div>
      <div v-if="selection === 0" class="profile-titles ml-8 w-100">
        <v-tabs v-model="tab">
          <v-tab value="one" class="text-capitalize">Тайп (3)</v-tab>
          <v-tab value="two" class="text-capitalize">Клин (6)</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="one">
            <div class="titles-wrapper mt-4">
              <v-card
                to="/title"
                rounded="lg"
                variant="text"
                v-for="n in 12"
                :key="n"
              >
                <v-img
                  class="rounded-lg"
                  src="https://remanga.org/media/titles/reincarnation-plan/540948e6326b29834c7dbaa487edd4ae.jpg"
                  cover
                >
                </v-img>

                <p class="manga-title pa-2 text-body-1">
                  Чертоваfffff реинкарнация
                </p>
              </v-card>
            </div>
          </v-window-item>

          <v-window-item class="w-100" value="two">
            <div class="titles-wrapper mt-4">
              <v-card link rounded="lg" variant="text" v-for="n in 12" :key="n">
                <v-img
                  class="rounded-lg"
                  src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"
                  cover
                >
                </v-img>

                <p class="manga-title pa-2 text-body-1">Диктор</p>
              </v-card>
            </div>
          </v-window-item>
        </v-window>
      </div>
      <div v-else-if="selection === 1" class="profile-settings w-100 ml-8">
        <v-card variant="flat" class="pa-4">
          <v-card-title class="pa-0"> Настройка аккаунта </v-card-title>
          <v-file-input
            class="mt-9"
            variant="outlined"
            accept="image/*"
            label="Загрузка аватара"
            prepend-icon=""
          >
          </v-file-input>
          <v-text-field
            class="rounded-lg"
            variant="outlined"
            label="Имя пользователя"
          >
          </v-text-field>
          <v-text-field variant="outlined" label="Почта"> </v-text-field>
          <v-text-field variant="outlined" label="Новый пароль"> </v-text-field>
          <v-text-field variant="outlined" label="Подтверждение пароля">
          </v-text-field>
          <v-btn height="35" width="30%" rounded="lg" class="text-capitalize">
            Сохранить
          </v-btn>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.manga-title {
  line-clamp: 2;
}
.titles-wrapper {
  display: grid;
  gap: 1rem 0.8rem;
  grid-template-columns: repeat(5, minmax(0px, 1fr));
}
.profile-info {
  width: 320px;
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1280px;
    padding: 0;
    padding-top: 50px;
  }
}
</style>
<route lang="yaml">
meta:
  requiresAuth: true
</route>
