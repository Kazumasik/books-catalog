<script setup>
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
const emit = defineEmits(["changeEditMode"]);
</script>
<template>
  <div class="title-left d-flex flex-column">
    <v-img cover class="rounded-xl manga-cover" :src="props.title.img">
      <div class="manga-cover-buttons w-100 d-flex justify-space-around">
        <!-- <v-btn
          height=""
          rounded="pill"
          color=""
          variant="text"
          icon="mdi-exit-to-app"
        >
        </v-btn> -->
        <v-btn
          v-if="props.title.discord_channel"
          :href="props.title.discord_channel"
          target="_blank"
          height=""
          rounded="pill"
          color=""
          variant="text"
          icon="fa:fas fa-brands fa-discord"
        >
        </v-btn>
        <v-btn
          target="_blank"
          :href="`https://remanga.org/manga/${props.title.slug}`"
          height=""
          rounded="pill"
          color=""
          variant="text"
          icon="mdi-yin-yang"
        >
        </v-btn>
        <v-btn
          @click="emit('changeEditMode')"
          height=""
          rounded="pill"
          color=""
          variant="text"
          icon="mdi-pencil"
        >
        </v-btn>
      </div>
    </v-img>

    <div v-if="!props.editMode" class="d-flex flex-column">
      <v-btn height="55" class="mt-4 text-body-1" color="">
        Частота: Раз в неделю
      </v-btn>
      <v-btn height="55" class="mt-4 text-body-1" color="">
        Ставка - 150 руб
      </v-btn>
    </div>
    <div v-else-if="props.editMode" class="d-flex flex-column">
      <v-btn
        @click="emit('changeEditMode')"
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
        @click="emit('changeEditMode')"
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
