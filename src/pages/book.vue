<script setup>
import BookCard from "../components/BookCard.vue";
import CatalogFilter from "../components/CatalogFilter.vue";
import commentary from "../components/book/commentary.vue";
import bookChapters from "../components/book/bookChapters.vue";
const bookmarks = ["Читаю", "Прочитав", "Буду читати"];
const commentaries = ref([]);
const publish = (e) => {
  if (commentary_text.value) {
    commentaries.value.unshift(commentary_text.value);
    commentary_text.value = "";
  }
};
const tab = ref(null);
const sortedCommentaries = computed(() => commentaries.value.reverse);
const commentary_text = ref("");
const chapters = ref([
  {
    title: "1",
    value: 1,
  },
  {
    title: "2",
    value: 2,
  },
  {
    title: "3",
    value: 3,
  },
]);
</script>

<template>
  <v-container>
    <div class="book-wrapper">
      <div class="first-column">
        <div class="first-column-wrapper">
          <v-img
            class="rounded-xl mb-4"
            cover
            src="src/assets/index1.jpg"
          ></v-img>
          <v-btn class="mb-4"> Читати </v-btn>
          <v-select
            class="elevation-0 mb-4"
            hide-details
            single-line
            label="Додати до закладок"
            :items="bookmarks"
            variant="solo"
          ></v-select>
          <router-link to="admin/edit-book"
            ><v-btn class="mb-4"> Редагувати </v-btn></router-link
          >
          <router-link to="admin/add-chapters"
            ><v-btn class="mb-4"> Додати главу </v-btn></router-link
          >
        </div>
      </div>
      <div class="second-column ml-6">
        <div class="book-content">
          <div class="book-header text-h4 mb-4 font-weight-bold">
            Я – самый жестокий класс поддержки – ⌈Диктор⌋, и я создам самый
            сильный клан в мире!
          </div>
          <div class="statistic d-flex mb-4">
            <v-btn variant="tonal" prepend-icon="mdi-star" size="default">
              7.8
            </v-btn>
            <v-btn
              variant="tonal"
              class="ml-2"
              prepend-icon="mdi-bookmark"
              size="default"
            >
              333
            </v-btn>
            <v-btn variant="tonal" class="ml-2" size="default">
              В процесі
            </v-btn>
          </div>
          <v-tabs v-model="tab">
            <v-tab value="description">Опис</v-tab>
            <v-tab value="chapters">Глави</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="description">
              <p class="my-4">
                Главный герой, Ноэль, хладнокровен и умён. В детстве он
                восхищался своим дедом - могущественным авантюристом, которого
                другие называли "Бессмертным". Ноэль хотел стать таким же, как и
                его дедушка, поэтому усиленно тренировался. Однако оказалось,
                что его квалификация - диктор, слабейший класс по личным боевым
                показателям. Несмотря на это Ноэль не сдаётся и продолжает
                упорно тренироваться. Однажды на его родную деревню нападают
                монстры и в неравном бою дедушка Ноэля погибает. Оставшись
                совсем один, Ноэль отправляется в жестокий мир, который полон
                обмана и предательства, чтоб стать сильнейшим авантюристом.
              </p>
              <v-chip-group class="mb-4">
                <router-link to="/action">
                  <v-chip rounded>Бойовик</v-chip>
                </router-link>
                <router-link to="/fantasy">
                  <v-chip rounded>Фентезі</v-chip>
                </router-link>
              </v-chip-group>
              <div class="commentaries">
                <h2 class="mb-4">Коментарі</h2>
                <v-textarea
                  v-model="commentary_text"
                  variant="solo"
                  hide-details
                  append-inner-icon="mdi-send-variant"
                  @click:appendInner="publish"
                  auto-grow
                  :rows="1"
                  :max-rows="6"
                  placeholder="Залиште свій коментар"
                ></v-textarea>
                <commentary
                  class="mt-4"
                  v-for="commentary in commentaries"
                  :key="commentary"
                  :commentary_text="commentary"
                ></commentary>
              </div>
            </v-window-item>
            <v-window-item value="chapters" class="mt-2">
              <v-btn class="my-2" variant="text">Показати спочатку</v-btn>
              <book-chapters :chapters="chapters"></book-chapters>
            </v-window-item>
          </v-window>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.v-card-title {
  font-size: 1rem;
  align-items: center;
}
.author {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2;
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
.first-column .v-btn {
  width: 100%;
}
.book-wrapper {
  display: flex;
  position: relative;
}
.first-column-wrapper {
  position: sticky;
  top: 90px;
}
.second-column {
  flex-grow: 1;
  display: flex;
}
.first-column {
  flex-shrink: 0;
}
.first-column,
.author-wrapper {
  width: 250px;
}
</style>
