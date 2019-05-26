import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Table from "./views/Table.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/table",
      name: "table",
      component: Table
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
