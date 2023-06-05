<script setup>
import moment from "moment";
import "../utils/moment-locale";
const props = defineProps({
  bookData: {
    type: Object,
    required: true,
  }
});
const imageUrl = import.meta.env.VITE_BASE_URL +"/"+props.bookData.imageUrl
const createdDate = moment(props.bookData.createdAt).locale("uk").fromNow();
</script>
<template>
  <v-card :to="`/book/${props.bookData._id}`" class="rounded-lg">
    <v-card-item>
      <div class="update-card d-flex align-center">
        <v-img
          class="rounded-lg"
          :src="imageUrl"
        >
        </v-img>
        <div class="update-content ml-4">
          <v-card-title> {{props.bookData.title}} </v-card-title>
          <v-card-subtitle>{{createdDate}}</v-card-subtitle>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>
<style scoped>
.v-card-text {
  padding: 0;
}
.v-img{
  max-width: 86px;
  width: 86px !important;
  height: 120px !important;
}
</style>
