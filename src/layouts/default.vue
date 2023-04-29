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
        <VBtn class="ms-4" icon variant="text" color="default" size="small">
          <VIcon icon="mdi-bell-outline" size="30" />
        </VBtn>
        <v-avatar class="ms-4" color="grey-darken-1" size="40"></v-avatar>
      </v-container>
    </v-app-bar>

    <v-main style="padding-top: 80px">
      <!-- <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-title> List Item {{ n }} </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey-lighten-4">
                  <v-list-item-title> Refresh </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col> -->

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup></script>
<style></style>
