<script setup>
import { reactive } from "vue";

const dialogLogin = ref(false);
const valid = ref(false);

const registrationData = reactive({
  nickname: "",
  email: "",
  password: "",
  repeatPassword: "",
});
</script>
<template>
  <v-btn variant="flat">
    Увійти
    <v-dialog v-model="dialogLogin" activator="parent" max-width="600px">
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
                required
              ></v-text-field>
              <v-text-field
                variant="outlined"
                v-model="registrationData.repeatPassword"
                label="Повторіть пароль"
                required
              ></v-text-field>
              <v-btn type="submit" class="mt-2">Зареєструватись</v-btn>
            </v-form>
          </VContainer>
        </VCardText>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<style scoped>
.v-card-title {
  text-align: center;
}
</style>
