<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";
const dialogRegister = ref(false);
const dialogLogin = ref(false);
const valid = ref(false);
const userStore = useUserStore();
const registrationData = reactive({
  nickname: "",
  email: "",
  password: "",
});

const loginData = reactive({
  email: "",
  password: "",
});
const isLoading = reactive({
  register: false,
  login: false,
});
const isPasswordVisible = ref(false);

const changeModal = async () => {
  dialogRegister.value = !dialogRegister.value;
  dialogLogin.value = !dialogLogin.value;
};
const loginRules = {
  emailRules: [
    (v) => !!v || "Пошта обов'язкова",
    (v) => /.+@.+/.test(v) || "Некоректний запис пошти",
  ],
  passwordRules: [(v) => !!v || "Пароль обов'язковий"],
};

const registerRules = {
  nicknameRules: [(v) => !!v || "Нікнейм обов'язковий"],
  emailRules: [
    (v) => !!v || "Пошта обов'язкова",
    (v) => /.+@.+/.test(v) || "Некоректний запис пошти",
  ],
  passwordRules: [
    (v) => !!v || "Пароль обов'язковий",
    (v) => v.length >= 5 || "Пароль повинен містити хоча б 5 символів",
  ],
  repeatPasswordRules: [
    (v) => v === registrationData.password || "Паролі повинні співпадати",
  ],
};
const register = async () => {
  isLoading.register = true;
  try {
    await userStore.register(registrationData);
    dialogRegister.value = false;
  } catch (error) {
    console.log(error);
  }
  isLoading.register = false;
};

const login = async () => {
  isLoading.login = true;
  try {
    await userStore.login(loginData);
    dialogRegister.value = false;
  } catch (error) {
    console.log(error);
  }
  isLoading.login = false;
};
</script>
<template>
  <v-btn variant="flat" @click="dialogLogin = true"> Увійти </v-btn>
  <v-dialog v-model="dialogLogin" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Вхід</v-card-title>
      <VCardText class="pt-0">
        <VContainer class="pt-0">
          <v-form @submit.prevent v-model="valid">
            <v-text-field
              variant="outlined"
              :rules="loginRules.emailRules"
              v-model="loginData.email"
              label="Пошта"
              required
              autocomplete="on"
            >
            </v-text-field>
            <v-text-field
              :rules="loginRules.passwordRules"
              class="mt-2"
              variant="outlined"
              v-model="loginData.password"
              label="Пароль"
              autocomplete="on"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              required
            ></v-text-field>
            <v-btn
              :loading="isLoading.login"
              type="submit"
              @click="login"
              class="mt-2 w-100"
              >Увійти</v-btn
            >
            <VCol cols="12" class="text-center text-base mt-2 pa-0">
              <span>Ще немає аккаунту?</span>
              <v-btn
                @click="changeModal"
                variant="text"
                class="text-subtitle-1 ms-2"
              >
                Зареєструйтесь
              </v-btn>
            </VCol>
          </v-form>
        </VContainer>
      </VCardText>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogRegister" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Реєстрація</v-card-title>
      <VCardText class="pt-0">
        <VContainer class="pt-0">
          <v-form @submit.prevent v-model="valid">
            <v-text-field
              :rules="registerRules.nicknameRules"
              variant="outlined"
              v-model="registrationData.nickname"
              label="Нікнейм"
              required
            ></v-text-field>
            <v-text-field
              :rules="registerRules.emailRules"
              variant="outlined"
              v-model="registrationData.email"
              label="Пошта"
              required
              class="mt-2"
            >
            </v-text-field>
            <v-text-field
              :rules="registerRules.passwordRules"
              variant="outlined"
              v-model="registrationData.password"
              label="Пароль"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              required
              class="mt-2"
            ></v-text-field>
            <v-text-field
              :rules="registerRules.repeatPasswordRules"
              variant="outlined"
              label="Підтвердіть пароль"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              class="mt-2"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              class="mt-2 w-100"
              @click="register"
              :loading="isLoading.register"
              >Зареєструватись</v-btn
            >
            <VCol cols="12" class="text-center text-base mt-2 pa-0">
              <span>Уже є аккаунт?</span>
              <v-btn
                @click="changeModal"
                variant="text"
                class="text-subtitle-1 ms-2"
              >
                Увійдіть
              </v-btn>
            </VCol>
          </v-form>
        </VContainer>
      </VCardText>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.v-card-title {
  text-align: center;
}
</style>
