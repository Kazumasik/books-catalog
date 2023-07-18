<script setup>
import { onMounted } from "vue";

const props = defineProps({
  roles: {
    type: Array,
    required: true,
  },
});
const tabTitles = ref();
onMounted(() => {
  tabTitles.value = props.roles[0].id;
});
</script>
<template>
  <div class="profile-titles ml-8 w-100">
    <v-tabs mandatory v-model="tabTitles">
      <v-tab
        v-for="role in props.roles"
        :key="role.id"
        :value="role.id"
        class="text-body-1"
        >{{ role.name + " (" + role.titles_count + ")" }}</v-tab
      >
    </v-tabs>
    <v-window v-model="tabTitles">
      <v-window-item
        v-for="role in props.roles"
        :key="role.id"
        :value="role.id"
      >
        <div
          v-for="title in role.titles"
          :key="title.id"
          class="titles-wrapper mt-4"
        >
          <v-card :to="`/title/${title.slug}`" rounded="lg" variant="text">
            <v-img
              class="rounded-lg"
              src="https://remanga.org/media/titles/reincarnation-plan/540948e6326b29834c7dbaa487edd4ae.jpg"
              cover
            >
            </v-img>

            <p class="manga-title pa-2 text-body-1">
              {{ title.name }}
            </p>
          </v-card>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<style lang="scss" scoped>
.manga-title {
  line-clamp: 2;
}
.titles-wrapper {
  display: grid;
  gap: 1rem 0.8rem;
  grid-template-columns: repeat(5, minmax(0px, 1fr));
}
</style>
