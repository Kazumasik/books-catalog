<script setup></script>
<template>
  <div class="profile-settings w-100 ml-8">
    <v-card variant="flat" class="pa-4">
      <v-card-title class="pa-0"> Настройка аккаунта </v-card-title>
      <v-file-input
        class="mt-9"
        variant="outlined"
        accept="image/*"
        label="Загрузка аватара"
        prepend-icon=""
      >
      </v-file-input>
      <v-text-field
        class="rounded-lg"
        variant="outlined"
        label="Имя пользователя"
      >
      </v-text-field>
      <v-text-field class="mt-4" variant="outlined" label="Почта">
      </v-text-field>
      <v-text-field class="mt-4" variant="outlined" label="Новый пароль">
      </v-text-field>
      <v-text-field
        class="mt-4"
        variant="outlined"
        label="Подтверждение пароля"
      >
      </v-text-field>
      <v-btn height="35" width="30%" rounded="lg" class="text-body-1 mt-4">
        Сохранить
      </v-btn>
    </v-card>
  </div>
</template>

<style lang="scss" scoped></style>
