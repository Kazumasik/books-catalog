<script setup>
const props = defineProps({
  chapters: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <router-link to="/chapter">
    <v-list-item
      class="rounded-lg mt-2"
      variant="flat"
      v-ripple
      v-for="(item, i) in props.chapters"
      :key="i"
      :value="item"
    >
      <template v-slot:prepend>
        <span class="text-lighten mr-5"> 1 </span>
      </template>
      <template v-slot:default>Глава {{ item.title }}</template>
      <template v-slot:append>12/02/2022 </template>
    </v-list-item>
  </router-link>
</template>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
