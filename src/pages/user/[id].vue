<script setup>
import { onMounted } from "vue";
import BookCard from "../../components/BookCard.vue";
import { useUserStore } from "@/stores/user.js";
import { useRoute } from "vue-router";
const tab = ref("reading");
const userStore = useUserStore();
const route = useRoute();
const user = ref({});
const books = ref([]);
const isYourProfile = ref(route.params.id === userStore.getUser.id);
const newNickname = ref("");
const editMode = ref(false);
const tooltipActivator = ref();
const rules = {
  required: (value) => !!value.trim() || "Нікнейм не може бути порожнім.",
  counter: (value) => value.length <= 20 || "Максимум 20 символів",
};
const changeName = async () => {
  if (!newNickname.value.trim()) {
    return;
  }
  editMode.value = false;
  const response = await userStore.changeName(newNickname.value);
  console.log("РЕСПОНС", response);
  user.value.nickname = response.nickname;
};
const passAlert = ref(false);
const passwordChange = ref({
  currentPassword: "",
  newPassword: "",
});
const isLoading = ref(false);
const passError = ref("");
const changePassword = async () => {
  if (
    passwordChange.value.currentPassword.trim().length != 0 &&
    passwordChange.value.newPassword.trim().length != 0
  ) {
    try {
      isLoading.value = true;
      await userStore.changePassword(passwordChange.value);
      passError.value = "";
      passAlert.value = true;
      setTimeout(() => {
        passAlert.value = false;
      }, 5000);
    } catch {
      passError.value = "Старий пароль невірний";
    }
    isLoading.value = false;
  }
};
const cancelEditing = () => {
  newNickname.value = user.value.nickname;
  editMode.value = false;
};

const giveAdminRole = async () => {
  await userStore.giveAdminRole(route.params.id);
  user.value = await userStore.findById(route.params.id);
};
const removeAdminRole = async () => {
  await userStore.removeAdminRole(route.params.id);
  user.value = await userStore.findById(route.params.id);
};
onMounted(async () => {
  user.value = await userStore.findById(route.params.id);
  books.value = user.value.bookmarks;
  newNickname.value = user.value.nickname;
  console.log(user.value);
});
</script>

<template>
  <v-alert
    style="
      z-index: 99;
      top: 70px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      width: 250px;
    "
    position="absolute"
    v-model="passAlert"
    closable
    type="success"
    text="Пароль успішно змінено"
  ></v-alert>
  <v-container>
    <div class="profile-header mx-2">
      <div class="profile-avatar">
        <v-avatar color="surface" size="100">
          <v-img
            src="https://remanga.org/media/publishers/getmanshina-test/high_cover.jpg"
          ></v-img>
        </v-avatar>
      </div>
      <div class="profile-header-content ml-4">
        <div v-if="!editMode">
          <div class="d-flex align-center">
            <h1>{{ user.nickname }}</h1>
            <v-tooltip
              :text="`${user.experience} / ${user.nextLevelExperience}`"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-progress-circular
                  v-bind="props"
                  :rotate="360"
                  :size="40"
                  :width="5"
                  :max-value="user.nextLevelExperience"
                  :model-value="
                    100 * (user.experience / user.nextLevelExperience)
                  "
                  class="ml-4"
                  color="teal"
                >
                  {{ user.level }}
                </v-progress-circular>
              </template>
            </v-tooltip>
            <v-tooltip
              v-if="
                userStore.isSuperAdmin &&
                !isYourProfile &&
                user.role !== 'admin'
              "
              activator="parent"
              location="top"
              >Надати роль адміністратора
              <template v-slot:activator="{ props }">
                <v-btn
                  @click="giveAdminRole"
                  v-bind="props"
                  size="small"
                  class="ml-4"
                  icon="mdi-arrow-up-bold"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              v-else-if="
                userStore.isSuperAdmin && !isYourProfile && user.role == 'admin'
              "
              activator="parent"
              location="top"
              >Забрати роль адміністратора
              <template v-slot:activator="{ props }">
                <v-btn
                  @click="removeAdminRole"
                  v-bind="props"
                  size="small"
                  class="ml-4"
                  icon="mdi-close-thick"
                  color="error"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <v-btn
            class="mt-4"
            v-if="isYourProfile"
            @click="editMode = true"
            append-icon="mdi-pencil"
          >
            Налаштування
          </v-btn>
        </div>
        <div class="h-100" v-else>
          <v-text-field
            variant="underlined"
            v-model="newNickname"
            label="Нікнейм"
            class="nickname-input"
            :rules="[rules.required, rules.counter]"
            maxlength="20"
            counter
          ></v-text-field>
          <v-btn-group class="mt-2">
            <v-btn
              size="small"
              @click="changeName"
              append-icon="mdi-check-bold"
              color="success"
            >
            </v-btn>
            <v-btn
              size="small"
              @click="cancelEditing"
              append-icon="mdi-close-thick"
              color="error"
            >
            </v-btn>
          </v-btn-group>
        </div>
      </div>
    </div>
  </v-container>
  <v-divider></v-divider>

  <v-container v-if="!editMode">
    <v-tabs v-model="tab" class="mb-4 mx-2">
      <v-tab value="reading">Читаю</v-tab>
      <v-tab value="end_read">Прочитав</v-tab>
      <v-tab value="will_read">Буду читати</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="reading">
        <div class="books-wrapper">
          <book-card
            v-for="book in books.reading"
            :key="book._id"
            :title="book.title"
            :url="book._id"
            :genre="book.genres[0]"
            :src="book"
          ></book-card>
        </div>
      </v-window-item>
      <v-window-item value="end_read">
        <div class="books-wrapper">
          <book-card
            v-for="book in books.end_read"
            :key="book._id"
            :title="book.title"
            :url="book._id"
            :genre="book.genres[0]"
            :src="book"
          >
          </book-card>
        </div>
      </v-window-item>
      <v-window-item value="will_read">
        <div class="books-wrapper">
          <book-card
            v-for="book in books.will_read"
            :key="book._id"
            :title="book.title"
            :url="book._id"
            :genre="book.genres[0]"
            :src="book"
          ></book-card>
        </div>
      </v-window-item>
    </v-window>
  </v-container>
  <v-container v-else>
    <v-tabs>
      <v-tab>Зміна паролю</v-tab>
    </v-tabs>

    <v-window class="py-6" v-model="tab">
      <v-window-item>
        <v-row>
          <v-col>
            <v-text-field
              v-model="passwordChange.currentPassword"
              label="Старий пароль"
              variant="outlined"
              :error-messages="passError"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="passwordChange.newPassword"
              label="Новий пароль"
              variant="outlined"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn :loading="isLoading" @click="changePassword"
              >Змінити пароль
            </v-btn>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
.profile-header {
  display: flex;
  align-items: center;
}

.books-wrapper {
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(7, minmax(0px, 1fr));
}
.nickname-input {
  min-width: 200px;
}

@media (max-width: 1279px) {
  .books-wrapper {
    grid-template-columns: repeat(5, minmax(0px, 1fr));
  }
}

@media (max-width: 959px) {
  .books-wrapper {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
  }
}
@media (max-width: 599px) {
  .books-wrapper {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}
@media (max-width: 399px) {
  .books-wrapper {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}
</style>
