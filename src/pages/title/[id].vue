<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
import router from "../../router";
const editMode = ref(false);
const userStore = useUserStore();
const tab = ref("ongoing");
const outputFormat = ref([
  "Ежедневник",
  "Еженедельник",
  "Двунедельник",
  "Ежемесячник",
]);
const daysWeek = ref([
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
]);
</script>

<template>
  <div class="background">
    <v-container class="d-flex flex-row">
      <div class="title-left d-flex flex-column">
        <v-img
          width="320"
          cover
          class="rounded-xl flex-0"
          src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"
        >
        </v-img>
        <div v-if="!editMode" class="d-flex flex-column">
          <v-btn
            @click="editMode = true"
            rounded="lg"
            height="55"
            class="mt-4 text-body-1"
          >
            Редактировать
          </v-btn>
          <div class="mt-4 gap-1 d-flex">
            <v-btn
              color=""
              rounded="lg"
              height="55"
              class="text-body-1 flex-grow-1"
            >
              <span> Discord </span>
            </v-btn>
            <v-btn
              color=""
              height="55"
              rounded="lg"
              class="text-body-1 flex-grow-1"
            >
              Remanga
            </v-btn>
          </div>
          <v-btn
            color=""
            variant="tonal"
            prepend-icon="mdi-exit-run"
            rounded="lg"
            height="55"
            class="mt-4 text-body-1"
          >
            <template #prepend>
              <v-icon icon="mdi-exit-to-app" color="error"> </v-icon>
            </template>
            Уйти с тайтла
          </v-btn>
        </div>
        <div v-else-if="editMode" class="d-flex flex-column">
          <v-btn
            @click="editMode = false"
            rounded="lg"
            height="55"
            class="mt-4 text-body-1"
          >
            Принять изменения
          </v-btn>
          <v-btn
            color=""
            rounded="lg"
            height="55"
            @click="editMode = false"
            class="text-body-1 flex-grow-1 mt-4"
          >
            <span> Вернуться назад </span>
          </v-btn>
        </div>
      </div>
      <div class="ml-14 flex-grow-1 title-right d-flex flex-column">
        <span v-if="!editMode" class="text-h5">[Еженедельник]</span>
        <h2 class="text-h3 mt-3 font-weight-bold">Диктор</h2>
        <div v-if="!editMode" class="d-flex gap mt-5">
          <v-chip color="primary">Raide</v-chip>
          <v-chip color="success">Nicaea</v-chip>
          <v-chip>Выф</v-chip>
        </div>
        <div v-if="!editMode">
          <v-tabs class="mt-10" v-model="tab">
            <v-tab class="text-body-1" value="ongoing">В процессе</v-tab>
            <v-tab class="text-body-1" value="ended">Готовые</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="ongoing">
              <v-expansion-panels class="mt-5 rounded-lg">
                <v-expansion-panel class="my-1" v-for="n in 6" :key="n">
                  <v-expansion-panel-title expand-icon="" collapse-icon="">
                    Глава 1
                    <v-spacer> </v-spacer>
                    <v-avatar size="20" color="primary"> </v-avatar>
                    <span class="ml-5">26.06.2023 </span>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" class="gap d-flex">
                        <v-chip
                          rounded="lg"
                          color="success"
                          class="h-100"
                          variant="outlined"
                        >
                          Nicaea
                        </v-chip>
                        <v-chip
                          rounded="lg"
                          color="primary"
                          class="h-100"
                          variant="outlined"
                        >
                          Manchan
                        </v-chip>
                        <v-spacer> </v-spacer>
                        <v-btn
                          height="35"
                          class="text-body-2"
                          variant="tonal"
                          color="grey-lighten-1"
                        >
                          Отдать главу
                        </v-btn>
                      </v-col>
                      <v-col cols="9">
                        <v-text-field
                          density="comfortable"
                          hide-details
                          variant="outlined"
                          label="Ссылка"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-btn height="45" class="w-100 text-body-2">
                          Отправить
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-window-item>

            <v-window-item value="ended">
              <v-expansion-panels class="mt-5 rounded-lg">
                <v-expansion-panel class="my-1" v-for="n in 6" :key="n">
                  <v-expansion-panel-title expand-icon="" collapse-icon="">
                    Глава 1
                    <v-spacer> </v-spacer>
                    <v-avatar size="20" color="primary"> </v-avatar>
                    <span class="ml-5">26.06.2023 </span>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" class="gap d-flex">
                        <v-chip
                          rounded="lg"
                          color="success"
                          class="h-100"
                          variant="outlined"
                        >
                          Nicaea
                        </v-chip>
                        <v-chip
                          rounded="lg"
                          color="primary"
                          class="h-100"
                          variant="outlined"
                        >
                          Manchan
                        </v-chip>
                        <v-spacer> </v-spacer>
                        <v-btn
                          height="35"
                          class="text-body-2"
                          variant="tonal"
                          color="grey-lighten-1"
                        >
                          Отдать главу
                        </v-btn>
                      </v-col>
                      <v-col cols="9">
                        <v-text-field
                          density="comfortable"
                          hide-details
                          variant="outlined"
                          label="Ссылка"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-btn height="45" class="w-100 text-body-2">
                          Отправить
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-window-item>
          </v-window>
        </div>
        <v-sheet rounded="lg" v-else-if="editMode" class="mt-11 pa-6">
          <v-row>
            <v-col cols="12">
              <p class="text-h5 font-weight-bold">Ссылки</p>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Ссылки на оригинал"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Ссылки на решку"></v-text-field>
            </v-col>
            <v-col cols="12">
              <p class="text-h5 font-weight-bold">Формат выхода</p>
            </v-col>
            <v-col cols="6">
              <v-select :items="outputFormat" label="Формат выхода"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select :items="daysWeek" label="День выхода"></v-select>
            </v-col>
            <v-col cols="12">
              <p class="text-h5 font-weight-bold">Состав</p>
            </v-col>
            <v-col cols="2">
              <v-btn variant="tonal" color="success"
                ><span class="text-body-1 text-white">Клинер</span></v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-select label="Ник"></v-select>
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<style>
.background {
  background: linear-gradient(
      180deg,
      rgba(0, 0.3, 0.5, 0.5) 0%,
      8.37%,
      #000 100%
    ),
    url("https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"),
    lightgray 50%;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1280px;
    padding: 0;
    padding-top: 50px;
  }
}

.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :first-child:not(:last-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--before-active
  ),
.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :not(:first-child):not(:last-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--after-active
  ),
.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :last-child:not(:first-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--after-active
  ),
.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :not(:first-child):not(:last-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--before-active
  ) {
  border-top-left-radius: inherit !important;
  border-top-right-radius: inherit !important;
  border-bottom-left-radius: inherit !important;
  border-bottom-right-radius: inherit !important;
}
.v-responsive {
  flex: 0 0 auto;
}
.v-expansion-panel__shadow {
  box-shadow: 0;
}
.v-expansion-panel:not(:first-child)::after {
  border: 0;
}
.gap-1 {
  gap: 1.35rem;
}
.title-left {
  width: 320px;
}
</style>
<route lang="yaml">
meta:
  layout: default
</route>
