<script setup>
import BookCard from "../../components/BookCard.vue";
import commentary from "../../components/book/commentary.vue";
import { useUserStore } from "@/stores/user.js";
import { useBookStore } from "@/stores/book.js";
import { watch } from "vue";
const bookmarks = [
  {
    value: "reading",
    title: "Читаю",
  },
  {
    value: "end_read",
    title: "Прочитав",
  },
  {
    value: "will_read",
    title: "Буду читати",
  },
];
const bookStore = useBookStore();
const userStore = useUserStore();
const book = ref({});
const commentaries = ref({});
const route = useRoute();
const dialogRating = ref(false);
const editId = ref(null);
const imageSrc = ref("");
const rating = ref(0);
const selectedBookmark = ref(null);

watch(rating, async (newValue, oldValue) => {
  const response = await bookStore.addRating(route.params.id, newValue);
  book.value.averageRating = response.averageRating;
  book.value.totalRatings = response.totalRatings;
});
const changeEditMode = (comentId) => {
  editId.value = comentId;
};
onMounted(async () => {
  book.value = await bookStore.findById(route.params.id);
  commentaries.value = await bookStore.fetchAllComments(route.params.id);
  imageSrc.value = import.meta.env.VITE_BASE_URL + "/" + book.value.imageUrl;
  selectedBookmark.value = book.value.bookmarkType;
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

const deleteComment = async (commentId) => {
  await bookStore.deleteComment(commentId);
  commentaries.value = await bookStore.fetchAllComments(route.params.id);
  editId.value = null;
};
const editComment = async (commentId, payload) => {
  await bookStore.editComment(commentId, payload);
  commentaries.value = await bookStore.fetchAllComments(route.params.id);
  editId.value = null;
};

const changeRating = () => {
  if (localStorage.getItem("token")) {
    dialogRating.value = true;
  }
};

const downloadBook = async () => {
  await bookStore.downloadBook(route.params.id, book.value.title);
};
const changeBookmark = async (newValue) => {
  console.log(newValue);
  if (newValue === null) {
    await userStore.deleteBookmark(route.params.id);
    book.value.bookmarkCount--;
  } else {
    await userStore.addBookmark(route.params.id, newValue);
    book.value.bookmarkCount++;
  }
};
</script>

<template>
  <v-container>
    <div class="book-wrapper">
      <div class="first-column">
        <div class="first-column-wrapper">
          <div class="book-cover">
            <v-img class="book-cover-image rounded-xl" cover :src="imageSrc"> </v-img>
            <div class="d-block d-sm-none mobile-cover-info pa-5">
              <h1 class="text-h4 text-white">
                {{ book.title }}
              </h1>
              <h4 class="text-grey-lighten-2 font-weight-medium">
                {{ book.origTitle }}
              </h4>
            </div>
          </div>
          <v-btn :to="`/book/${book._id}/content?page=1`" class="mt-4">
            Читати
          </v-btn>
          <v-btn class="mt-4" @click="downloadBook" append-icon="mdi-download">
            Завантажити
          </v-btn>
          <v-select
            @update:modelValue="changeBookmark"
            clearable
            v-model="selectedBookmark"
            class="elevation-0 mt-4"
            hide-details
            single-line
            label="Додати до закладок"
            :items="bookmarks"
            variant="solo"
          ></v-select>
          <v-btn
            v-if="userStore.isAdmin"
            :to="`/admin/edit-book/${book._id}`"
            class="mt-4"
          >
            Редагувати
          </v-btn>
        </div>
      </div>
      <div class="second-column ml-0 ml-sm-4">
        <div class="book-content flex-grow-1">
          <div class="d-none d-sm-block book-header">
            <h1 class="text-h4 font-weight-bold">
              {{ book.title }}
            </h1>
            <h4 class="text-medium-emphasis font-weight-medium">
              {{ book.origTitle }}
            </h4>
          </div>
          <div class="statistic d-flex my-4">
            <v-btn
              variant="tonal"
              @click="changeRating"
              prepend-icon="mdi-star-four-points"
              size="default"
            >
              {{ book.averageRating }} ({{ book.totalRatings }})
            </v-btn>
            <v-btn
              variant="tonal"
              class="ml-2"
              prepend-icon="mdi-bookmark"
              size="default"
            >
              {{ book.bookmarkCount }}
            </v-btn>
          </div>
          <p class="my-4">
            {{ book.description }}
          </p>
          <v-chip-group class="mb-1 pa-0">
            <router-link
              v-for="genre in book.genres"
              :key="genre._id"
              :to="`/book?page=1&genre=${genre._id}`"
            >
              <v-chip rounded>{{ genre.name }}</v-chip>
            </router-link>
          </v-chip-group>
          <v-chip-group v-if="book.categories?.length" class="mb-4 pa-0">
            <router-link
              v-for="category in book.categories"
              :key="category._id"
              :to="`/book?page=1&category=${category._id}`"
            >
              <v-chip rounded>{{ category.name }}</v-chip>
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
              counter="500"
              :rows="1"
              :disabled="!userStore.isAuth"
              :placeholder="
                userStore.isAuth
                  ? 'Залиште свій коментар'
                  : 'Авторизуйтеся, щоб залишити коментар'
              "
            >
            </v-textarea>
            <commentary
              class="mt-4"
              @edit="editComment"
              @setEditMode="changeEditMode"
              @delete="deleteComment"
              v-for="commentary in commentaries"
              :commentary_id="commentary._id"
              :key="commentary._id"
              :date="commentary.createdAt"
              :commentary_text="commentary.content"
              :user="commentary.user"
              :editMode="commentary._id === editId"
            ></commentary>
          </div>
        </div>
      </div>
    </div>
  </v-container>
  <v-dialog v-model="dialogRating" max-width="600px">
    <v-card>
      <v-card-title class="text-h7 text-sm-h6 text-center"
        >Поставте свою оцінку цій книзі.</v-card-title
      >
      <VContainer class="pt-0 d-flex justify-center">
        <v-rating
          v-model="rating"
          color="grey"
          active-color="primary"
          hover
          size="25"
          length="10"
          empty-icon="mdi-star-four-points-outline"
          full-icon="mdi-star-four-points"
        ></v-rating>
      </VContainer>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.book-cover {
  position: relative;
}
.book-cover-image div:first-child {
  background-image: linear-gradient(
    -180deg,
    transparent 70%,
    rgba(0, 0, 0, 0.9) 90%
  );
}
.mobile-cover-info {
  position: absolute;
  bottom: 0;
  inline-size: 100%;
  overflow: hidden;
}
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
@media (max-width: 599px) {
  .book-wrapper {
    flex-wrap: wrap;
  }
  .first-column {
    width: 100%;
  }
}
</style>
