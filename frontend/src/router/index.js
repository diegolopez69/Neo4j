import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Jugadores from "../views/Jugadores.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/jugadores",
    name: "Jugadores",
    component: Jugadores
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
