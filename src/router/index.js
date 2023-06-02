import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Mission from "../views/Mission.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },

    {
      path: "/mission",
      name: "mission",
      component: Mission,
    },
  ],
});

export default router;
