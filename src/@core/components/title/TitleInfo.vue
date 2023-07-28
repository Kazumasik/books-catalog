<script setup></script>
<template>
  <div class="title-left d-flex flex-column">
    <v-img
      cover
      class="rounded-xl manga-cover"
      src="https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"
    >
      <div class="manga-cover-buttons w-100 d-flex justify-space-around">
        <v-btn
          height=""
          rounded="pill"
          color=""
          variant="text"
          icon="mdi-exit-to-app"
          @click="exitDialog = true"
        >
        </v-btn>
        <v-btn
          height=""
          rounded="pill"
          color=""
          variant="text"
          icon="fa:fas fa-brands fa-discord"
        >
        </v-btn>
        <v-btn
          height=""
          rounded="pill"
          color=""
          variant="text"
          icon="mdi-yin-yang"
        >
        </v-btn>
      </div>
    </v-img>

    <div v-if="!editMode" class="d-flex flex-column">
      <v-btn height="55" class="mt-3 text-body-1" color="">
        Частота: Раз в неделю
      </v-btn>
      <v-btn height="55" class="mt-3 text-body-1" color="">
        Ставка - 150 руб
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
</template>

<style scoped>
.title-left {
  width: 320px;
  flex-shrink: 0;
}
@media (max-width: 599px) {
  .title-left {
    width: 100%;
  }
}
.manga-cover-buttons {
  padding-top: 60px;
  height: 120px;
  position: absolute;
  bottom: 0px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent);
}
.manga-cover {
  position: relative;
  flex: 0 0 auto;
}
</style>
