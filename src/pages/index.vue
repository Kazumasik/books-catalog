<script setup>
const chaptersTab = ref("coming");
</script>

<template>
  <div class="background">
    <v-container>
      <p class="text-center text-h3 font-weight-bold">Лента</p>
      <v-tabs class="mx-auto mt-6 chapter-type" v-model="chaptersTab">
        <v-tab class="text-body-1" value="coming">В процессе (6)</v-tab>
        <v-tab class="text-body-1" value="made">Готовые (0)</v-tab>
      </v-tabs>
      <v-window class="mt-4" v-model="chaptersTab">
        <v-window-item value="coming">
          <v-expansion-panels class="rounded-lg">
            <v-expansion-panel class="my-1" v-for="n in 6" :key="n">
              <v-expansion-panel-title expand-icon="" collapse-icon="">
                <span>Глава 1</span>
                <router-link to="/titles" class="ml-4">Диктор</router-link>
                <v-spacer> </v-spacer>
                <v-avatar size="20" color="primary"> </v-avatar>
                <span class="ml-5">26.06.2023 </span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="12" class="gap d-flex">
                    <v-chip
                      to="/user/2"
                      rounded="lg"
                      color="success"
                      class="h-100"
                      variant="outlined"
                    >
                      Nicaea
                    </v-chip>
                    <v-chip
                      to="/user/2"
                      rounded="lg"
                      color="primary"
                      class="h-100"
                      variant="outlined"
                    >
                      Manchan
                    </v-chip>
                    <v-spacer> </v-spacer>
                    <v-btn
                      height="35"
                      class="text-body-2"
                      variant="tonal"
                      color="grey-lighten-1"
                    >
                      Отдать главу
                    </v-btn>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      density="comfortable"
                      hide-details
                      variant="outlined"
                      label="Ссылка"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-btn height="45" class="w-100 text-body-2">
                      Відправити!
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-window-item>

        <v-window-item value="made"> </v-window-item>
      </v-window>
    </v-container>
  </div>
</template>

<style scoped>
.background {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, 62.37%, #000 100%),
    url("/src/assets/back-feed.png"), lightgray 50%;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}
@media (min-width: 1920px) {
  .v-container {
    max-width: 1280px;
    padding: 0;
    padding-top: 50px;
  }
}

.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :first-child:not(:last-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--before-active
  ),
.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :not(:first-child):not(:last-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--after-active
  ),
.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :last-child:not(:first-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--after-active
  ),
.v-expansion-panels:not(.v-expansion-panels--variant-accordion)
  > :not(:first-child):not(:last-child):not(.v-expansion-panel--active):not(
    .v-expansion-panel--before-active
  ) {
  border-top-left-radius: inherit !important;
  border-top-right-radius: inherit !important;
  border-bottom-left-radius: inherit !important;
  border-bottom-right-radius: inherit !important;
}

.v-expansion-panel__shadow {
  box-shadow: 0;
}
.v-expansion-panel:not(:first-child)::after {
  border: 0;
}
</style>
<route lang="yaml">
meta:
  requiresAuth: true
</route>
