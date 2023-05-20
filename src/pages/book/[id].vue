<script setup>
import BookCard from "../../components/BookCard.vue";
import commentary from "../../components/book/commentary.vue";
import { useUserStore } from "@/stores/user.js";
import { useBookStore } from "@/stores/book.js";
const bookmarks = ["Читаю", "Прочитав", "Буду читати"];
const bookStore = useBookStore();
const userStore = useUserStore();
const book = ref({});
const commentaries = ref({});
const route = useRoute();

const editId = ref(null)

const changeEditMode = (comentId)=>{
  console.log(comentId)
  editId.value=comentId
}

onMounted(async () => {
  book.value = await bookStore.findById(route.params.id);
  commentaries.value = await bookStore.fetchAllComments(route.params.id);
});

const publish = async () => {
  await bookStore.createComment(route.params.id, commentaryData);
  commentaryData.content = "";
  commentaries.value = await bookStore.fetchAllComments(route.params.id);
};
const commentaryData = reactive({
  user: userStore.getUser.id,
  content: "",
});

const deleteComment = (commentId)=>{

}
</script>

<template>
  <v-container>
    <div class="book-wrapper">
      <div class="first-column">
        <div class="first-column-wrapper">
          <v-img
            class="rounded-xl mb-4"
            cover
            src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"
          ></v-img>
          <router-link to="/chapter">
            <v-btn class="mb-4"> Читати </v-btn>
          </router-link>
          <v-select
            class="elevation-0 mb-4"
            hide-details
            single-line
            label="Додати до закладок"
            :items="bookmarks"
            variant="solo"
          ></v-select>
          <router-link :to="`/admin/edit-book/${book._id}`">
            <v-btn class="mb-4"> Редагувати </v-btn>
          </router-link>
        </div>
      </div>
      <div class="second-column ml-6">
        <div class="book-content flex-grow-1">
          <div class="book-header mb-4">
            <h1 class="text-h4 font-weight-bold">
              {{ book.title }}
            </h1>
            <h4 class="text-medium-emphasis font-weight-medium">
              {{ book.origTitle }}
            </h4>
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
          </div>
          <p class="my-4">
            {{ book.description }}
          </p>
          <v-chip-group class="mb-4 pa-0">
            <router-link
              v-for="genre in book.genres"
              :key="genre._id"
              to="/action"
            >
              <v-chip rounded>{{ genre.name }}</v-chip>
            </router-link>
          </v-chip-group>
          <div class="commentaries">
            <h2 class="mb-4">Коментарі</h2>
            <v-textarea
              persistent-counter
              maxLength="500"
              v-model="commentaryData.content"
              variant="outlined"
              append-inner-icon="mdi-send-variant"
              @click:appendInner="publish"
              @keydown.enter.prevent="publish"
              auto-grow
              :rows="1"
              placeholder="Залиште свій коментар"
            >
            </v-textarea>
            <commentary
              class="mt-4"
              @setEditMode="changeEditMode"
              @delete="deleteComment"
              v-for="commentary in commentaries"
              :commentary_id="commentary._id"
              :key="commentary._id"
              :date="commentary.createdAt"
              :commentary_text="commentary.content"
              :user="commentary.user"
              :editMode="commentary._id===editId"
            ></commentary>
          </div>
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
