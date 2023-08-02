<script setup>
import { reactive } from "vue";
import { useTitleStore } from "@/stores/title.js";
import { useUserStore } from "@/stores/user.js";
import router from "../../router";
import { useRoute } from "vue-router";
import TitleInfo from "@core/components/title/TitleInfo.vue";
import TitleContent from "@core/components/title/TitleContent.vue";
const title = ref();
const isLoading = ref(true);
const route = useRoute();
const titleStore = useTitleStore();
const userStore = useUserStore();
onMounted(async () => {
  const { content } = await titleStore.findBySlug(route.params.slug);
  title.value = content;
  isLoading.value = false;
  const coloredRoles = userStore.getWorkersColor(
    JSON.parse(JSON.stringify(title.value.workers))
  );
});
const applyChanges = () => {
  editMode.value = false;
};
const editMode = ref(false);
const exitDialog = ref(false);
</script>

<template>
  <div class="background">
    <v-container v-if="!isLoading" class="d-flex title-container">
      <TitleInfo
        @applyChanges="applyChanges"
        @changeEditMode="editMode = !editMode"
        :editMode="editMode"
        :title="title"
      ></TitleInfo>
      <TitleContent :editMode="editMode" :title="title"> </TitleContent>
    </v-container>
  </div>

  <v-dialog :scrollable="false" v-model="exitDialog" width="500">
    <v-card class="pa-4 rounded-xl">
      <v-img
        class="rounded-xl"
        cover
        src="https://w.wallhaven.cc/full/we/wallhaven-wem1zx.jpg"
      ></v-img>
      <v-card-text class="text-h6 font-weight-bold text-center">
        Ты точно хочешь уйти? <br />Напиши причину, если да :c
      </v-card-text>
      <v-textarea
        class="mt-2"
        no-resize
        bg-color="grey-darken-3"
        variant="solo-filled"
      >
      </v-textarea>
      <v-card-actions>
        <v-row>
          <v-col cols="6">
            <v-btn
              variant="flat"
              color="primary"
              @click="exitDialog = false"
              class="text-body-1 w-100"
            >
              Отмена
            </v-btn>
          </v-col>
          <v-col cols="6"
            ><v-btn
              variant="outlined"
              color="error"
              @click="exitDialog = false"
              class="text-body-1 w-100"
            >
              Уйти
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style></style>
<style scoped>
.v-container {
  max-width: 1280px;
}
@media (max-width: 600px) {
  .title-container {
    flex-wrap: wrap;
  }
}

.background {
  background: linear-gradient(
      180deg,
      rgba(0, 0.3, 0.5, 0.5) 0%,
      8.37%,
      #000 100%
    ),
    url("https://remanga.org/media/titles/the-most-notorious-talker-runs-the-worlds-greatest-clan/a5b434d0072124f001284b4ac99726ff.jpg"),
    lightgray 50%;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}
.v-container {
  padding-top: 50px;
}
@media (max-width: 599px) {
  .v-container {
    padding: 16px;
  }
}
</style>
<route lang="yaml">
meta:
  layout: default
</route>
