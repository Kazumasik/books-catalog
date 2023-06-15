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

const cancelEditing = () => {
  newNickname.value = user.value.nickname;
  editMode.value = false;
};
onMounted(async () => {
  user.value = await userStore.findById(route.params.id);
  books.value = user.value.bookmarks;
  newNickname.value = user.value.nickname;
  console.log(books.value);
});
</script>

<template>
  <v-container>
    <div class="profile-header mx-2">
      <div class="profile-avatar">
        <v-avatar size="100">
          <v-img
            src="https://renovels.org/media/publishers/geas-novels/high_cover.jpg"
          ></v-img>
        </v-avatar>
      </div>
      <div class="profile-header-content ml-4">
        <div v-if="!editMode">
          <div class="d-flex align-center">
            <h1>{{ user.nickname }}</h1>
            <v-tooltip theme="white" :text="`${user.experience} / ${user.nextLevelExperience}`" location="top">
              <template v-slot:activator="{ props }">
                <v-progress-circular
                  v-bind="props"
                  :rotate="360"
                  :size="40"
                  :width="5"
                  :max-value="user.nextLevelExperience"
                  :model-value="100*(user.experience/user.nextLevelExperience)"
                  class="ml-4"
                  color="teal"
                >
                  {{ user.level }}
                </v-progress-circular>
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
        <div v-else>
          <v-text-field
            variant="outlined"
            v-model="newNickname"
            label="Нікнейм"
            class="nickname-input"
            :rules="[rules.required, rules.counter]"
            maxlength="20"
            counter
          ></v-text-field>
          <v-btn-group class="mt-2">
            <v-btn
              @click="changeName"
              append-icon="mdi-check-bold"
              color="success"
            >
              Зберегти
            </v-btn>
            <v-btn
              @click="cancelEditing"
              append-icon="mdi-close-thick"
              color="error"
            >
              Відмінити
            </v-btn>
          </v-btn-group>
        </div>
      </div>
    </div>
  </v-container>
  <v-divider></v-divider>
  <v-container>
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
