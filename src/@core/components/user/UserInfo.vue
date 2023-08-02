<script setup>
import { useUserStore } from "@/stores/user.js";
import { onMounted } from "vue";
const userStore = useUserStore();
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isYourProfile: {
    type: Boolean,
    required: true,
  },
});
const status = ref(userStore.getStatusById(props.user.status));

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
    <v-avatar color="surface" size="166">
      <v-icon icon="mdi-account-circle" size="166"> </v-icon>
    </v-avatar>
    <div class="w-100 gap profile-icons d-flex justify-center">
      <v-btn
        :href="`https://vk.com/id${props.user.vk_id}/`"
        rounded="pill"
        color=""
        variant="text"
        icon="fa:fas fa-brands fa-vk"
      ></v-btn>
      <v-btn
        :href="props.user.telegram"
        rounded="pill"
        color=""
        variant="text"
        icon="fa:fas fa-brands fa-telegram"
      ></v-btn>
      <v-btn
        :href="`https://discordapp.com/users/${props.user.discord_id}/`"
        rounded="pill"
        color=""
        variant="text"
        icon="fa:fas fa-brands fa-discord"
      ></v-btn>
    </div>
    <v-card-title class="pa-0 text-center mt-2 text-h4 font-weight-bold">
      {{ props.user.username }}
    </v-card-title>
    <div class="d-flex gap mt-4">
      <v-chip v-if="props.isYourProfile" link rounded="pill" variant="tonal">
        {{ user.balance + " руб" }}
      </v-chip>
      <v-btn
        rounded="pill"
        variant="tonal"
        color="grey-lighten-2"
        height="32"
        class="text text-capitalize"
      >
        <v-avatar
          :color="status?.color ? status.color : 'grey-lighten-2'"
          class="mr-4"
          size="18"
        >
        </v-avatar>
        {{ status?.name ? status.name : "Статус" }}
        <v-menu
          v-if="isYourProfile"
          offset="5px"
          location="bottom"
          activator="parent"
        >
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
