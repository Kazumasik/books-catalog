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

router.beforeEach(async function (to, from, next) {
  const userStore = useUserStore();
  const genreStore = useGenreStore();
  if(!userStore.getUser.nickname && localStorage.getItem('token')){
    await userStore.current();
  }
  if(!genreStore.getGenres.length){
    await genreStore.fetchAll();
  }
  if(to.meta.requiresAdmin && userStore.getUserRole !== "admin"){
    next('/')
  }
  next()
});
export default router;
