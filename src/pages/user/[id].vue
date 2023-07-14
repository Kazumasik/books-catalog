<script setup>
import { onMounted, reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRoute } from "vue-router";
const userStore = useUserStore();
const route = useRoute();
const user = ref({});
const isYourProfile = ref(+route.params.id === userStore.user.id);
const tabTitles = ref(null);
const statuses = ref(null);
const selection = ref();
onMounted(async () => {
  const { content } = await userStore.findById(route.params.id);
  user.value = content;
  tabTitles.value = content.roles[0].id;

  const { content: statusesContent } = await userStore.getStatuses();
  statuses.value = statusesContent;
});

const changeStatus = async (status) => {
  user.value.status = status;
  await userStore.changeStatus(status.id);
};
</script>

<template>
  <v-container>
    <div class="profile d-flex">
      <div class="profile-info d-flex flex-column">
        <v-card
          rounded="xl"
          variant="flat"
          height="340"
          width="320"
          class="d-flex justify-center flex-column align-center"
        >
          <div class="w-100 profile-icons d-flex justify-space-between px-10">
            <a
              :href="`https://discordapp.com/users/${user.discord_id}/`"
              target="_blank"
            >
              <v-avatar size="30" rounded="">
                <v-img
                  src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
                >
                </v-img>
              </v-avatar>
            </a>
            <a :href="`https://vk.com/id${user.vk_id}/`" target="_blank">
              <v-avatar size="30" rounded="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    class="st0"
                    d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"
                  />
                </svg>
              </v-avatar>
            </a>
          </div>

          <v-avatar color="surface" size="166">
            <v-img
              src="https://remanga.org/media/users/44887/avatar_GA9ed7N.jpg"
            ></v-img>
          </v-avatar>
          <v-card-title class="pa-0 text-center mt-4 text-h4 font-weight-bold">
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
              {{ user.status ? user.status.name : "Статус" }}
              <v-menu offset="5px" location="bottom" activator="parent">
                <v-list rounded="lg" bg-color="grey-darken-3" density="compact">
                  <v-list-item
                    @click="changeStatus(status)"
                    v-for="status in statuses"
                    :key="status"
                  >
                    <v-list-item-title class="text-center">{{
                      status.name
                    }}</v-list-item-title>
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
        <v-tabs mandatory v-model="tabTitles">
          <v-tab
            v-for="role in user.roles"
            :key="role.id"
            :value="role.id"
            class="text-body-1"
            >{{ role.name + " (" + role.titles_count + ")" }}</v-tab
          >
        </v-tabs>

        <v-window v-model="tabTitles">
          <v-window-item
            v-for="role in user.roles"
            :key="role.id"
            :value="role.id"
          >
            <div
              v-for="title in role.titles"
              :key="title.id"
              class="titles-wrapper mt-4"
            >
              <v-card :to="`/title/${title.slug}`" rounded="lg" variant="text">
                <v-img
                  class="rounded-lg"
                  src="https://remanga.org/media/titles/reincarnation-plan/540948e6326b29834c7dbaa487edd4ae.jpg"
                  cover
                >
                </v-img>

                <p class="manga-title pa-2 text-body-1">
                  {{ title.name }}
                </p>
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
          <v-text-field class="mt-4" variant="outlined" label="Почта">
          </v-text-field>
          <v-text-field class="mt-4" variant="outlined" label="Новый пароль">
          </v-text-field>
          <v-text-field
            class="mt-4"
            variant="outlined"
            label="Подтверждение пароля"
          >
          </v-text-field>
          <v-btn height="35" width="30%" rounded="lg" class="text-body-1 mt-4">
            Сохранить
          </v-btn>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.vk-icon {
  fill: white;
}
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
