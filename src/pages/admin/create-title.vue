<script setup>
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const newTitle = ref({
  raw_name: "诡异复苏：我能化身大妖",
  slug: "strange-recovery-i-can-become-a-big-demon",
  is_active: false,
  discord_channel:
    "https://discord.com/channels/1029830351721332856/1133776760044003328",
  raw: "https://remanga.org/manga/became-a-tyrant-of-defense-games",
  ad_date: null,
  release_frequency: 3,
  workers: [
    {
      id: 1,
      user: {
        id: 1,
        username: "raide",
      },
      role: 0,
      rate: 101,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 2,
      user: {
        id: 1,
        username: "raide",
      },
      role: 1,
      rate: 100,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 3,
      user: {
        id: 1,
        username: "raide",
      },
      role: 2,
      rate: 100,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 4,
      user: {
        id: 1,
        username: "raide",
      },
      role: 3,
      rate: 100,
      is_paid_by_pages: true,
      days_for_work: 1,
    },
    {
      id: 5,
      user: {
        id: 1,
        username: "raide",
      },
      role: 4,
      rate: 100,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 6,
      user: {
        id: 1,
        username: "raide",
      },
      role: 5,
      rate: 100,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
  ],
});
</script>
<template>
  <v-container class="">
    <p class="w-100 text-center d-flex text-h4 font-weight-bold">
      Добавление тайтла
    </p>
    <v-sheet rounded="lg" class="mt-11 pa-6 w-100">
      <v-row>
        <v-col cols="12">
          <p class="text-h5 font-weight-bold">Ссылки</p>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Реманга" v-model="newTitle.slug"></v-text-field>
          <v-text-field
            class="mt-4"
            label="Оригинал"
            v-model="newTitle.raw"
          ></v-text-field>
          <v-text-field
            v-model="newTitle.discord_channel"
            class="mt-4"
            label="Discord"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <p class="text-h5 font-weight-bold">Выход на реманге</p>
        </v-col>
        <v-col cols="6">
          <p class="text-h5 font-weight-bold">Выход на оригинале</p>
        </v-col>
        <v-col cols="3">
          <v-select :items="outputFormat" label="Формат выхода"></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field type="date" label="Дата выхода"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select :items="outputFormat" label="Формат выхода"></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field type="date" label="Дата выхода"></v-text-field>
        </v-col>
        <v-col cols="12">
          <p class="text-h5 font-weight-bold">Общее</p>
        </v-col>
        <v-col cols="6">
          <v-select :items="languages" label="Язык оригинала"></v-select>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            hide-details=""
            color="primary"
            label="Постраничная оплата"
            v-model="newTitle.workers[3].is_paid_by_pages"
          ></v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            hide-details=""
            v-model="newTitle.is_active"
            color="primary"
            label="Активный тайтл"
          ></v-checkbox>
        </v-col>
        <v-col cols="12">
          <p class="text-h5 font-weight-bold">Состав</p>
        </v-col>
        <v-row v-for="role in userStore.roles" :key="role.name">
          <v-col cols="2">
            <v-btn
              height="56px"
              variant="tonal"
              :color="role.color"
              class="w-100"
            >
              <span class="text-body-1 text-white">{{ role.name }}</span>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-select
              item-title="user.username"
              label="Ник"
              v-model="newTitle.workers[role.id]"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              type="number"
              label="Дней на главу"
              v-model="newTitle.workers[role.id].days_for_work"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              type="number"
              label="Ставка"
              v-model="newTitle.workers[role.id].rate"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<style scoped>
.v-container {
  max-width: 1280px;
  padding-top: 50px;
}
</style>
