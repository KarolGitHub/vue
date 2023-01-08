import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { auth } from "@/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  auth.actions.fetchAccessToken();
  const accessToken = auth.getters.getAccessToken();

  if (to.fullPath.includes("/admin")) {
    if (!accessToken) {
      next("/auth/login");
    }
  }
  if (to.fullPath === "/auth/login") {
    if (accessToken) {
      next("/admin/dashboard");
    }
  }
  next();
});

export default router;
