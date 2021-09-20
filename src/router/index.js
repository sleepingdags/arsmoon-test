import Vue from "vue";
import VueRouter from "vue-router";

import BreedPage from '@/components/BreedPage'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("../views/Main.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("../views/Favorites.vue"),
  },
  {
    path: '/:breed',
    component: BreedPage
  }
];

const router = new VueRouter({
  routes,
});

export default router;
