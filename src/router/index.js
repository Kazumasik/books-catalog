import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { setupLayouts } from "virtual:generated-layouts";
import { useUserStore } from '@/stores/user'
import { useGenreStore } from "@/stores/genre.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  const userStore = useUserStore();
  const genreStore = useGenreStore();
  if(!userStore.getUser.nickname && localStorage.getItem('token')){
    userStore.current();
  }
  console.log(genreStore.getGenres.length)
  if(!genreStore.getGenres.length){
    genreStore.fetchAll();
  }
  next()
});
export default router;
