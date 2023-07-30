<script setup>
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const props = defineProps({
  title: {
    type: Object,
    required: true,
  },
  editMode: {
    type: Boolean,
    required: true,
  },
});
const roles = ref([
  {
    name: "Клинер",
    color: "success",
  },
  {
    name: "Переводчик",
    color: "purple",
  },
  {
    name: "Тайпер",
    color: "primary",
  },
  {
    name: "Бета",
    color: "indigo",
  },
  {
    name: "Куратор",
    color: "error",
  },
]);
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
  <div class="ml-0 ml-sm-14 flex-grow-1 title-right d-flex flex-column">
    <h2 class="text-h3 mt-3 font-weight-bold">{{ props.title.name }}</h2>
    <div class="d-flex align-center mt-3">
      <p class="text-h5">
        最凶の支援職【話術士】である俺は世界最強クランを従える
      </p>
      <v-btn
        v-if="props.title.raw"
        target="_blank"
        :href="props.title.raw"
        color=""
        height=""
        class="text-body-1 ml-4"
      >
        Оригинал
      </v-btn>
    </div>

    <div v-if="!props.editMode" class="d-flex gap mt-5">
      <v-chip
        v-for="worker in props.title.workers"
        :key="worker.id"
        color="primary"
        :to="worker.user?.id ? `/user/${worker.user.id}` : ''"
        >{{ worker.user?.username ? worker.user.username : "      " }}</v-chip
      >
    </div>
    <div v-if="!props.editMode">
      <v-tabs class="mt-4" v-model="tab">
        <v-tab
          :transition="false"
          :reverse-transition="false"
          class="text-body-1"
          value="ongoing"
          >В процессе</v-tab
        >
        <v-tab
          :transition="false"
          :reverse-transition="false"
          class="text-body-1"
          value="ended"
          >Готовые</v-tab
        >
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
    <v-sheet rounded="lg" v-else-if="props.editMode" class="mt-11 pa-6">
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
        <v-row v-for="role in roles" :key="role.name">
          <v-col cols="2">
            <v-btn variant="tonal" :color="role.color" class="w-100">
              <span class="text-body-1 text-white">{{ role.name }}</span>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-select label="Ник"></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field type="number" label="Дней на главу"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field type="number" label="Ставка"></v-text-field>
          </v-col>
        </v-row>
      </v-row>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
