import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Jugadores from "../views/Jugadores.vue";
import Competiciones from "../views/Competiciones.vue";
import Equipos from "../views/Equipos.vue";
import CompeticionEquipo from "../views/CompeticionEquipo.vue";
import EquipoJugador from "../views/EquipoJugador.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/competiciones",
    name: "Competiciones",
    component: Competiciones
  },
  {
    path: "/equipos",
    name: "Equipos",
    component: Equipos
  },
  {
    path: "/jugadores",
    name: "Jugadores",
    component: Jugadores
  },
  {
    path: "/competicionEquipo",
    name: "CompeticionEquipo",
    component: CompeticionEquipo
  },
  {
    path: "/equipoJugador",
    name: "EquipoJugador",
    component: EquipoJugador
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
