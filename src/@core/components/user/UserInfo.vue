<script setup>
import { useUserStore } from "@/stores/user.js";
import { onMounted } from "vue";

const userStore = useUserStore();
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const status = ref("");

onMounted(() => {
  status.value = props.user.status;
});
const changeStatus = async (newStatus) => {
  status.value = newStatus;
  await userStore.changeStatus(newStatus.id);
};
</script>
<template>
  <v-card
    rounded="xl"
    variant="flat"
    height="340"
    width="320"
    class="d-flex justify-center flex-column align-center"
  >
    <div class="w-100 profile-icons d-flex justify-space-between px-10">
      <a
        :href="`https://discordapp.com/users/${props.user.discord_id}/`"
        target="_blank"
      >
        <v-avatar size="30" rounded="">
          <v-img
            src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
          >
          </v-img>
        </v-avatar>
      </a>
      <a :href="`https://vk.com/id${props.user.vk_id}/`" target="_blank">
        <v-avatar size="30" rounded="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#fff"
              class="st0"
              d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"
            />
          </svg>
        </v-avatar>
      </a>
    </div>

    <v-avatar color="surface" size="166">
      <v-img
        src="https://remanga.org/media/users/44887/avatar_GA9ed7N.jpg"
      ></v-img>
    </v-avatar>
    <v-card-title class="pa-0 text-center mt-4 text-h4 font-weight-bold">
      {{ props.user.username }}
    </v-card-title>
    <div class="d-flex gap mt-4">
      <v-chip link rounded="pill" variant="tonal">
        {{ user.balance + " руб" }}
      </v-chip>
      <v-btn
        rounded="pill"
        variant="tonal"
        color="grey-lighten-2"
        class="h-auto text text-capitalize"
      >
        <v-avatar
          :color="status?.color ? status.color : 'grey-lighten-2'"
          class="mr-4"
          size="18"
        >
        </v-avatar>
        {{ status?.name ? status.name : "Статус" }}
        <v-menu offset="5px" location="bottom" activator="parent">
          <v-list rounded="lg" bg-color="grey-darken-3" density="compact">
            <v-list-item
              @click="changeStatus(status)"
              v-for="status in userStore.statuses"
              :key="status"
            >
              <v-list-item-title
                class="text-center"
                :class="'text-' + status.color"
              >
                {{ status.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.profile-info {
  width: 320px;
}
</style>
