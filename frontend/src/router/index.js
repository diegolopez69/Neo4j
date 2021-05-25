import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login-view.vue";
import Dashboard from "../views/Dashboard-view.vue";
import Passwords from "../views/Passwords-view.vue";
import SharedPasswords from "../views/SharedPasswords-view.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/passwords",
    name: "Passwords",
    component: Passwords
  },
  {
    path: "/sharedpasswords",
    name: "SharedPasswords",
    component: SharedPasswords
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
