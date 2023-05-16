<script setup>
import { onMounted } from "vue";
import BookCard from "../../components/BookCard.vue";
import { useUserStore } from "@/stores/user.js";
import { useRoute } from "vue-router";
import BookPlaceholder from "../../components/BookPlaceholder.vue";
const tab = ref(null);
const userStore = useUserStore();
const route = useRoute();
const user = ref({ nickname: "" });
const isYourProfile = ref(route.params.id === userStore.getUser.id);
const newNickname = user.value.nickname;
const editMode = ref(false);
const onEditMode = ()=>{
    console.log(editMode.value)
    editMode.value = true
}
onMounted(async () => {
  user.value = await userStore.findById(route.params.id);
});
</script>

<template>
  <v-container>
    <div class="profile-header mx-2">
      <div class="profile-avatar">
        <v-avatar size="120">
          <v-img
            src="https://renovels.org/media/publishers/geas-novels/high_cover.jpg"
          ></v-img>
        </v-avatar>
      </div>
      <div class="profile-header-content ml-4">
        <h1 v-if="!editmode" class="mb-4">{{ user.nickname }}</h1>
        <v-text-field
          v-if="editmode"
          v-model="newNickname"
          label="Нікнейм"
        ></v-text-field>
        <v-btn
          v-if="isYourProfile"
          @click="onEditMode"
          append-icon="mdi-pencil"
        >
          Налаштування
        </v-btn>
      </div>
    </div>
  </v-container>
  <v-divider></v-divider>
  <v-container>
    <v-tabs v-model="tab" class="mb-4 mx-2">
      <v-tab value="reading">Читаю</v-tab>
      <v-tab value="read">Прочитав</v-tab>
      <v-tab value="will-read">Буду читати</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="reading">
        <div class="catalog-wrapper">
          <book-card
            v-for="n in 12"
            :key="n"
            book_name="Диктор"
            :book_grade="2"
            src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"
            class="catalog-item"
          ></book-card>
          <book-placeholder
            v-for="n in 10"
            :key="n"
            class="catalog-item"
          ></book-placeholder>
        </div>
      </v-window-item>
      <v-window-item value="read">
        <div class="catalog-wrapper">
          <book-card
            v-for="n in 3"
            :key="n"
            book_name="Нежить"
            :book_grade="2"
            src="https://remanga.org/media/titles/undead-king-an-adventurer-at-the-bottom-evolutionary-warriors-with-the-power-of-demons/691e549f4674e228c46a07cc2c3be1dd.jpg"
            class="catalog-item"
          ></book-card>
          <book-placeholder
            v-for="n in 10"
            :key="n"
            class="catalog-item"
          ></book-placeholder></div
      ></v-window-item>
      <v-window-item value="will-read"> </v-window-item>
    </v-window>
  </v-container>
</template>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
.profile-avatar {
  flex-basis: 15%;
}
.profile-header {
  display: flex;
  align-items: center;
}

.catalog-wrapper {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.catalog-item,
.book-placeholder {
  flex: 1 0 auto;
}
.book-placeholder {
  width: 200px;
}
</style>
