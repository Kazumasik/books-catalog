<script setup>
import { reactive } from "vue";
import { useUserStore } from '@/stores/user'
const dialogRegister = ref(false);
const dialogLogin = ref(false);
const valid = ref(false);
const userStore = useUserStore()
const registrationData = reactive({
  nickname: "",
  email: "",
  password: "",
});

const loginData = reactive({
  email: "",
  password: "",
});

const isPasswordVisible = ref(false);

const changeModal = async () => {
  dialogRegister.value = !dialogRegister.value;
  dialogLogin.value = !dialogLogin.value;
};

const register = async ()=>{
  try {
      await userStore.register(registrationData)
      dialogRegister.value=false
    } catch(error) {
      console.log(error)
    }
}

const login = async ()=>{
  try {
      await userStore.login(loginData)
      dialogRegister.value=false
    } catch(error) {
      console.log(error)
    }
}
</script>
<template>
  <v-btn variant="flat" @click="dialogLogin=true"> Увійти </v-btn>
  <v-dialog v-model="dialogLogin" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Вхід</v-card-title>
      <VCardText class="pt-0">
        <VContainer class="pt-0">
          <v-form @submit.prevent v-model="valid">
            <v-text-field
              variant="outlined"
              v-model="loginData.email"
              label="Пошта"
              required
              autocomplete="on"
            >
            </v-text-field>
            <v-text-field
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
            <v-btn type="submit" @click="login" class="mt-2 w-100">Увійти</v-btn>
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
              variant="outlined"
              v-model="registrationData.nickname"
              label="Нікнейм"
              required
            ></v-text-field>
            <v-text-field
              variant="outlined"
              v-model="registrationData.email"
              label="Пошта"
              required
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              v-model="registrationData.password"
              label="Пароль"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              required
            ></v-text-field>
            <v-text-field
              variant="outlined"
              v-model="registrationData.repeatPassword"
              label="Повторіть пароль"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              required
            ></v-text-field>
            <v-btn type="submit" class="mt-2 w-100" @click="register">Зареєструватись</v-btn>
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
