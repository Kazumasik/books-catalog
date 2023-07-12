<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
import router from "../router";
const userStore = useUserStore();
const loginData = reactive({
  login: "amirkhdaur@gmail.com",
  password: "1234",
});
const isPasswordVisible = ref(false);

// Методы
const login = async () => {
  await userStore.login(loginData);
  router.replace("/");
};
</script>

<template>
  <div class="wrapper">
    <div transition="scroll-x-transition" class="background"></div>
    <div class="background-grey">
      <v-container class="h-screen d-flex justify-center align-center">
        <v-row class="login-wrapper">
          <v-col cols="12">
            <span class="text-h2">Вход</span>
          </v-col>

          <v-col cols="12" class="mt-8 d-flex align-center py-0">
            <v-icon size="large" color="primary" icon="mdi-account"></v-icon>
            <span class="ml-2 text-h5"> Логин </span>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="loginData.login"
              class="mt-2"
              variant="solo"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex align-center py-0">
            <v-icon size="large" color="primary" icon="mdi-lock"></v-icon>
            <span class="ml-2 text-h5"> Пароль </span>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="loginData.password"
              class="mt-2 rounded-xs"
              variant="solo"
              autocomplete="on"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              @click="login"
              height="50px"
              class="text-h6 text-capitalize log-in"
            >
              Продолжить
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  overflow: hidden;
  height: 100vh;
}
.login-wrapper {
  margin-top: -100px;
  max-width: 450px;
}
.background {
  overflow: hidden;
  position: relative;
  background: url("../assets/back.jpg");
  left: 40vw;
  width: 60vw;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: 2s;
  transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.2);
  overflow: hidden;
}
.background:hover {
  height: 110%;
}
.background-grey {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 4;
  height: 100vh;
  width: 60vw;
  background: #151415;
  clip-path: polygon(0% 0%, 100% 0, 90% 50%, 100% 100%, 0% 100%);
}
</style>
<route lang="yaml">
meta:
  layout: blank
  requiresUnauth: true
</route>
