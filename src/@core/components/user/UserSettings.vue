<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
const password = reactive({
  new: "",
  repeat: "",
});
const changePass = () => {
  form.value.validate();
  userStore.changePassword(password.new);
};
const rules = {
  required: (v) => !!v || "Это обязательное поле",
  minimum: (v) => v.length >= 4 || "Пароль должен содержать как минимум 4 символа",
  match: (v) => v === password.new || "Пароли должны совпадать",
};
console.log(rules);
const form = ref(null);
</script>
<template>
  <div class="profile-settings w-100 ml-8">
    <v-card variant="flat" class="pa-10">
      <v-card-title class="pa-0 text-h4"> Настройка аккаунта </v-card-title>
      <v-form @submit.prevent ref="form">
        <v-text-field
          :rules="[rules.required]"
          v-model="password.new"
          class="mt-10"
          variant="outlined"
          label="Новый пароль"
          :hide-details="false"
        >
        </v-text-field>
        <v-text-field
          :hide-details="false"
          :rules="[rules.required, rules.match]"
          v-model="password.repeat"
          class="mt-4"
          variant="outlined"
          label="Подтверждение пароля"
        >
        </v-text-field>
        <v-btn class="text-body-1 mt-4 px-10" @click="changePass">
          Сохранить
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<style lang="scss" scoped></style>
