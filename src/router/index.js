import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { setupLayouts } from "virtual:generated-layouts";
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  const userStore = useUserStore();
  if(!userStore.getUser.nickname && localStorage.getItem('token')){
    userStore.current();
  }
  next()
});
export default router;
