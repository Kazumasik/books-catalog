<script setup>
import moment from "moment";
import {defineEmits} from 'vue';
import "../../utils/moment-locale";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const emit = defineEmits(['setEditMode', 'delete'])
const props = defineProps({
  commentary_id: {
    type: String,
    required: true,
  },
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
  editMode: {
    type: Boolean,
    required: true,
  },
});

const isYourProfile = computed(() => userStore.getUser.id === props.user._id);

const editing = computed(() => {
  return isYourProfile && props.editMode;
});
const newCommentaryText = ref(props.commentary_text);

const cancelEdit = ()=>{
  emit('setEditMode', null)
  newCommentaryText.value = props.commentary_text;
}

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
        <v-btn
          @click="$emit('setEditMode', props.commentary_id)"
          v-if="!editing"
          size="small"
          variant="text"
          icon="mdi-pencil"
        ></v-btn>
      </div>
      <v-card-text>
        <p v-if="!editing">{{ props.commentary_text }}</p>
        <v-textarea
          v-else-if="editing"
          persistent-counter
          maxLength="500"
          v-model="newCommentaryText"
          variant="outlined"
          auto-grow
          :rows="1"
        >
        </v-textarea>
      </v-card-text>
      <v-card-actions v-if="editing">
        <v-btn
          size="small"
          color="red-lighten-1"
          variant="text"
          icon="mdi-trash-can"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn size="small" color="green-lighten-1" variant="text"
          >Зберегти</v-btn
        >

        <v-btn size="small" @click="cancelEdit" color="red-lighten-1" variant="text">Відміна</v-btn>
      </v-card-actions>
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
