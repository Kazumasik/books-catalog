import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { useUserStore } from "@/stores/user";
import { setupLayouts } from "virtual:generated-layouts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async function (to, from, next) {
  const userStore = useUserStore();
  if (!userStore.user && userStore.token) {
    try {
      await userStore.current();
    } catch {
      userStore.logout();
    }
  }
  if (!userStore.user && !to.meta.requiresUnauth) {
    next("/login");
    return;
  }
  next();
  return;
});
export default router;
