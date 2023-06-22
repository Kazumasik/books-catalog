<script setup>
import { useTheme } from "vuetify";
import { useUserStore } from "@/stores/user.js";
import router from "../../router";
const userStore = useUserStore();
const logOut = () => {
  userStore.logout();
};

const userId = ref(userStore.getUserId);
const themes = [
  {
    name: "light",
    icon: "mdi-weather-sunny",
  },
  {
    name: "dark",
    icon: "mdi-weather-night",
  },
];
const vuetifyTheme = useTheme();
const {
  state: currentTheme,
  next: getNextThemeName,
  index: currentThemeIndex,
} = useCycleList(
  themes.map((t) => t.name),
  { initialValue: vuetifyTheme.global.name.value }
);
const changeTheme = () => {
  vuetifyTheme.global.name.value = getNextThemeName();
};
const getThemeIcon = computedWithControl(vuetifyTheme.global.name, () => {
  const nextThemeIndex =
    currentThemeIndex.value + 1 === themes.length
      ? 0
      : currentThemeIndex.value + 1;

  return themes[nextThemeIndex].icon;
});
watch(vuetifyTheme.global.name, (val) => {
  currentTheme.value = val;
});
</script>
<template>
  <VAvatar style="cursor: pointer">
    
    <VAvatar color="primary" variant="tonal" icon="mdi-account" ></VAvatar>
    <VMenu activator="parent" width="230" location="bottom end" offset="25px">
      <VList>
        <VListItem :to="`/user/${userId}`">
          <template #prepend>
            <VListItemAction start>
              <VAvatar
                icon="mdi-account"
                color="primary"
                size="32"
                variant="tonal"
              >
              </VAvatar>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ userStore.getUser.nickname }}
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="userStore.isAdmin" to="/admin/create-book">
          <template #prepend>
            <VIcon icon="mdi-book-plus" class="me-2" size="22" />
          </template>

          <VListItemTitle>Створити книгу</VListItemTitle>
        </VListItem>
        <VListItem v-if="userStore.isAdmin" to="/admin/genres-and-categories">
          <template #prepend>
            <VIcon icon="mdi-pencil-box" class="me-2" size="22" />
          </template>

          <VListItemTitle>Жанри та категорії</VListItemTitle>
        </VListItem>
        <VListItem @click="changeTheme">
          <template #prepend>
            <VIcon :icon="getThemeIcon" class="me-2" size="22" />
          </template>

          <VListItemTitle>Змінити тему</VListItemTitle>
        </VListItem>
        <VListItem :active="false" @click="logOut" to="/">
          <template #prepend>
            <VIcon class="me-2" icon="mdi-logout" size="22" />
          </template>

          <VListItemTitle>Вийти</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </VAvatar>
</template>
<style scoped></style>
