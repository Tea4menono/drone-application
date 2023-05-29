import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Map from "../views/Map.vue";
import Settings from "../views/Settings.vue";
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
      path: "/map",
      name: "map",
      component: Map,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/mission",
      name: "mission",
      component: Mission,
    },
  ],
});

export default router;
