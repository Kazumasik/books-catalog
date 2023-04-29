<script setup>
import { useTheme } from "vuetify";
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
  <v-app id="inspire">
    <v-app-bar flat height="72px">
      <v-container class="fill-height d-flex align-center">
        <router-link to="/">
          <v-avatar class="me-5" color="grey-darken-1" size="40"></v-avatar>
        </router-link>
        <router-link to="/catalog">
          <v-btn variant="text"> Каталог </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <VTextField
          prepend-inner-icon="mdi-magnify"
          density="compact"
          variant="outlined"
          :hide-details="true"
        />
        <VBtn
          icon
          variant="text"
          color="default"
          size="small"
          class="ml-4"
          @click="changeTheme"
        >
          <VIcon :icon="getThemeIcon" size="30" />
        </VBtn>
        <VBtn class="ms-4" icon variant="text" color="default" size="small">
          <VIcon icon="mdi-bell-outline" size="25" />
        </VBtn>
        <v-avatar class="ms-4" color="grey-darken-1" size="40"></v-avatar>
      </v-container>
    </v-app-bar>

    <v-main style="padding-top: 80px">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup></script>
<style></style>
