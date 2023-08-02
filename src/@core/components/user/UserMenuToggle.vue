<script setup>
// @click="emit('toggle', 'settings')"
import { useUserStore } from "@/stores/user.js";
import { onMounted } from "vue";
const emit = defineEmits(["toggle"]);
const props = defineProps({
  isYourProfile: {
    type: Boolean,
    required: true,
  },
});
const changeSelection = (toggle, newSelection) => {
  toggle();
  emit("toggle", newSelection);
};
</script>
<template>
  <v-item-group mandatory="force" class="d-flex flex-column">
    <v-item v-slot="{ isSelected, toggle }">
      <v-btn
        :color="isSelected ? 'primary' : 'grey-lighten-1'"
        class="mt-4 text-capitalize"
        prepend-icon="mdi-bookmark-outline"
        :variant="isSelected ? 'outlined' : 'tonal'"
        height="55"
        rounded="lg"
        @click="changeSelection(toggle, 'titles')"
      >
        <template v-slot:prepend>
          <v-icon size="x-large"></v-icon>
        </template>
        <span class="text-left"> Тайтлы </span>
      </v-btn>
    </v-item>
    <v-item v-if="props.isYourProfile" v-slot="{ isSelected, toggle }">
      <v-btn
        @click="changeSelection(toggle, 'settings')"
        :color="isSelected ? 'primary' : 'grey-lighten-1'"
        :variant="isSelected ? 'outlined' : 'tonal'"
        class="mt-4 text-capitalize"
        prepend-icon="mdi-cog-outline"
        height="55"
        rounded="lg"
      >
        <template v-slot:prepend>
          <v-icon size="x-large"></v-icon>
        </template>
        Настройки
      </v-btn>
    </v-item>
  </v-item-group>
</template>

<style lang="scss" scoped></style>
