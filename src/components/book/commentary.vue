<script setup>
import moment from "moment";
import "../../utils/moment-locale";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();

const props = defineProps({
  commentary_text: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  editMode:{
    type: Boolean,
    required: true,
  }
});


const isYourProfile = computed(() => userStore.getUser.id===props.user._id)

const createdDate = moment(props.date).locale("uk").fromNow();
</script>
<template>
  <div class="commentary-wrapper">
    <router-link :to="`/user/${props.user._id}`">
      <v-avatar size="48">
        <v-img
          src="https://remanga.org/media/publishers/getmanshina-test/high_cover.jpg"
        ></v-img>
      </v-avatar>
    </router-link>
    <v-card class="ml-4">
      <div class="commentary-header d-flex justify-space-between">
        <div class="left-side d-flex align-center">
          <router-link :to="`/user/${props.user._id}`">
            <v-card-title class="text-subtitle-1">
              {{ props.user.nickname }}
            </v-card-title>
          </router-link>
          <v-card-subtitle class="ml-2">
            {{ createdDate }}
          </v-card-subtitle>
        </div>
        <v-btn v-if="isYourProfile" size="small" variant="text" icon="mdi-pencil"></v-btn>
      </div>
      <v-card-text>
        <p>{{ props.commentary_text }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.commentary-header {
  display: flex;
  align-items: center;
}
.commentary-wrapper {
  display: flex;
}
.commentary-wrapper .v-card {
  flex-grow: 1;
}
.commentary-wrapper .v-card-text {
  word-break: break-word;
}
.commentary-wrapper .v-card {
  padding: 6px 16px 10px 16px;
}
.commentary-wrapper .v-card div {
  padding: 0;
}
</style>
