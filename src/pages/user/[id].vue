<script setup>
import { onMounted, reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRoute } from "vue-router";
import UserInfo from "@core/components/user/UserInfo.vue";
import UserMenuToggle from "@core/components/user/UserMenuToggle.vue";
import UserTitles from "@core/components/user/UserTitles.vue";
import UserSettings from "@core/components/user/UserSettings.vue";
const userStore = useUserStore();
const route = useRoute();
const user = ref(null);
const isYourProfile = ref(+route.params.id === userStore.user.id);
const selection = ref("titles");
const isLoading = ref(true);
onMounted(async () => {
  const { content } = await userStore.findById(route.params.id);
  user.value = content;
  isLoading.value = false;
  console.log("ONMOUNTED");
});
const changeSelection = (newSelection) => [(selection.value = newSelection)];
</script>

<template>
  <v-container v-if="!isLoading">
    <div class="profile d-flex">
      <div class="profile-info d-flex flex-column">
        <UserInfo :isYourProfile="isYourProfile" :user="user"></UserInfo>
        <UserMenuToggle
          :isYourProfile="isYourProfile"
          @toggle="changeSelection"
        ></UserMenuToggle>
      </div>
      <UserTitles v-if="selection == 'titles'" :roles="user.roles" />
      <UserSettings v-if="selection == 'settings'" />
    </div>
  </v-container>
</template>
<style>
.v-container {
  max-width: 1280px;
}
</style>
<style scoped>
.v-container {
  padding-top: 50px;
}
</style>
<route lang="yaml">
meta:
  requiresAuth: true
</route>
