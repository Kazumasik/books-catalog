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
  <VAvatar  style="cursor: pointer" color="primary" variant="tonal">
    <!-- SECTION Menu -->
    <VMenu activator="parent" width="230" location="bottom end" offset="25px">
      <VList>
        <VListItem to="/user">
          <template #prepend>
            <VListItemAction start>
              <VAvatar color="primary" size="40" variant="tonal">
                <VImg src="src/assets/geas.jpg" />
              </VAvatar>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            Maxim4ik
          </VListItemTitle>
        </VListItem>
        <VListItem @click="changeTheme">
          <template #prepend>
            <VIcon :icon="getThemeIcon" class="me-2" size="22" />
          </template>

          <VListItemTitle>Змінити тему</VListItemTitle>
        </VListItem>
        <VListItem>
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
