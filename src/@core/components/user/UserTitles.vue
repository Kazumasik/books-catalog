<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const props = defineProps({
  roles: {
    type: Array,
    required: true,
  },
});
const roles = ref(
  userStore.getRolesById(JSON.parse(JSON.stringify(props.roles)))
);
const tabTitles = ref();
</script>
<template>
  <div class="profile-titles ml-8 w-100">
    <v-tabs mandatory v-model="tabTitles">
      <v-tab
        v-for="role in roles"
        :key="role.id"
        :value="role.id"
        class="text-body-1"
        >{{ role.name + " (" + role.titles_count + ")" }}</v-tab
      >
    </v-tabs>
    <v-window v-model="tabTitles">
      <v-window-item v-for="role in roles" :key="role.id" :value="role.id">
        <div class="titles-wrapper mt-4">
          <v-card
            v-for="title in role.titles"
            :key="title.id"
            :to="`/title/${title.slug}`"
            rounded="lg"
            variant="text"
          >
            <v-img class="rounded-lg" :src="title.img" cover> </v-img>

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
