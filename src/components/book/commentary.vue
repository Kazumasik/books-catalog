<script setup>
const props = defineProps({
  commentary_text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="commentary-wrapper">
    <router-link to="user">
      <v-avatar size="56">
        <v-img src="src/assets/geas.jpg"></v-img>
      </v-avatar>
    </router-link>
    <v-card class="ml-4">
      <div class="commentary-header">
        <router-link to="user">
          <v-card-title class="text-subtitle-1"> Maxim4ik </v-card-title>
        </router-link>
        <v-card-subtitle class="ml-2">4 дні тому</v-card-subtitle>
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
