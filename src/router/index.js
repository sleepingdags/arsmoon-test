import Vue from "vue";
import VueRouter from "vue-router";

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
    path: "/:breed",
    name: "BreedPage",
    component: () => import("../components/BreedPage.vue"),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
