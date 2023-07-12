<script></script>
<template>
  <v-card variant="tonal" height="100" link class="pr-4 my-4">
    <div class="d-flex flex-no-wrap align-center">
      <div class="chapter-image">
        <v-img
          class="rounded-lg"
          height="100"
          cover
          src="https://remanga.org/media/titles/dawn-of-the-whole-body/9dd50f9a957e0b99cd9862a6f9828195.jpg"
        ></v-img>
      </div>
      <span class="ml-4 text-h5"> Король из ада </span>
      <span class="ml-4 text-h5"> 12 </span>
      <v-spacer></v-spacer>
      <span class="text-h5"> 5 дней </span>
      <v-btn class="ml-16" width="140">Тайп</v-btn>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.chapter-image {
  overflow: hidden;
  width: 70px;
  transition: 2s;
  transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.2);
}
.chapter-image:hover {
  transform: scale(1.2);
}
</style>
