<script setup>
import { useUserStore } from "@/stores/user.js";
import { useTitleStore } from "@/stores/title.js";
import { reactive } from "vue";
import router from "../../router";
const titleStore = useTitleStore();
const userStore = useUserStore();
const allWorkers = ref();
const isLoading = reactive({
  page: true,
  creating: false,
});
const rules = {
  required: (v) => !!v || "Это обязательное поле",
};

onMounted(async () => {
  allWorkers.value = await userStore.getUsersByRoles();
  console.log("allWorkers", allWorkers.value);
  isLoading.page = false;
});
const applications = ref(["Hykecomic", "Помидор"]);
const languages = ref(["Японский", "Корейский", "Китайский", "Английский"]);
const outputFormat = ref([
  "Ежедневник",
  "Еженедельник",
  "Двунедельник",
  "Ежемесячник",
]);
const form = ref(null);
const newTitle = ref({
  raw_name: "",
  slug: "",
  is_active: false,
  discord_channel: "",
  raw: null,
  ad_date: null,
  release_frequency: 3,
  application: null,
  workers: [
    {
      id: 1,
      user: null,
      role: 0,
      rate: 0,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 2,
      user: null,
      role: 1,
      rate: 0,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 3,
      user: null,
      role: 2,
      rate: 0,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 4,
      user: null,
      role: 3,
      rate: 0,
      is_paid_by_pages: true,
      days_for_work: 1,
    },
    {
      id: 5,
      user: null,
      role: 4,
      rate: 0,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
    {
      id: 6,
      user: null,
      role: 5,
      rate: 0,
      is_paid_by_pages: false,
      days_for_work: 1,
    },
  ],
});

const createTitle = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  }
  isLoading.creating = true;
  newTitle.value.slug = convertToSlug(newTitle.value.slug);
  try {
    await titleStore.createTitle(newTitle.value);
    router.push(`/title/${newTitle.value.slug}`);
  } catch {}

  isLoading.creating = false;
};
function convertToSlug(url) {
  const lastSlashIndex = url.lastIndexOf("/");
  const path = url.substring(lastSlashIndex + 1);

  // Удаляем параметры запроса, если они есть, отрезая все, что идет после "?"
  const cleanPath = path.split("?")[0];

  // Удаляем все специальные символы, кроме дефисов, букв и цифр
  const cleanedPath = cleanPath.replace(/[^a-zA-Z0-9-]/g, "");

  // Заменяем пробелы и подчеркивания на дефисы
  const slug = cleanedPath.replace(/[\s_]+/g, "-");

  // Приводим к нижнему регистру
  return slug.toLowerCase();
}
</script>
<template>
  <v-container v-if="!isLoading.page">
    <p class="text-center w-100 text-h4 font-weight-bold">Добавление тайтла</p>
    <v-sheet rounded="lg" class="mt-11 pa-6 w-100">
      <v-form @submit.prevent ref="form">
        <v-row>
          <v-col cols="12">
            <p class="text-h5 font-weight-bold">Ссылки</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :rules="[rules.required]"
              label="Реманга"
              v-model="newTitle.slug"
              :hide-details="false"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :hide-details="false"
              label="Оригинал"
              v-model="newTitle.raw"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              :hide-details="false"
              clearable
              label="Приложение"
              :items="applications"
              v-model="newTitle.application"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :hide-details="false"
              :rules="[rules.required]"
              v-model="newTitle.discord_channel"
              label="Discord"
            ></v-text-field>
            <v-text-field
              :hide-details="false"
              :rules="[rules.required]"
              class="mt-4"
              label="Оригинальное название"
              v-model="newTitle.raw_name"
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
        </v-row>
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
              item-title="username"
              item-value="id"
              label="Ник"
              v-model="newTitle.workers[role.id].user"
              :items="allWorkers[role.id].users"
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
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-btn
              :loading="isLoading.creating"
              @click="createTitle"
              height="56"
              class="text-body-1 w-100"
              >Добавить</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn height="56" color="background" class="text-body-1 w-100"
              >Отмена</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>
<style scoped>
.v-container {
  max-width: 1280px;
  padding-top: 50px;
}
</style>
