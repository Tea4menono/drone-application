import { createRouter, createWebHistory } from "vue-router";
import Map from "../views/Map.vue";
import Log from "../views/Log.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/map",
      name: "map",
      component: Map,
    },
    {
      path: "/log",
      name: "log",
      component: Log,
    },
  ],
});

export default router;
