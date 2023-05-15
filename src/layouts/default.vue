<script setup>
import { useTheme } from "vuetify";
import LoginButton from "../components/header/LoginButton.vue";
import ProfileButton from "../components/header/ProfileButton.vue";
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

        <VBtn class="mx-4" icon variant="text" color="default" size="small">
          <VIcon icon="mdi-bell-outline" size="25" />
        </VBtn>
        <LoginButton/>
        <ProfileButton class="ms-4"/>
      </v-container>
    </v-app-bar>

    <v-main style="padding-top: 80px">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style></style>
