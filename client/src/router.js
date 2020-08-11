import Vue from "vue";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

import EnergyCarry from "./components/KnowledgeBaseComponents/EnergyCarry";
import Units from "./components/KnowledgeBaseComponents/Units";
import Categories from "./components/KnowledgeBaseComponents/Categories";
import Resources from "./components/KnowledgeBaseComponents/Resources";
import ResourcesAdd from "./components/KnowledgeBaseComponents/ResourceAdd";

import Main from "./components/Modules/Main";

import SecretService from "./components/SecretService";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
      children: [
        {
          path: "/energyResources",
          name: "energyRes",
          component: EnergyCarry,
        },
        {
          path: "/units",
          name: "units",
          component: Units,
        },
        {
          path: "/category",
          name: "category",
          component: Categories,
        },
        {
          path: "/resources",
          name: "resources",
          component: Resources,
        },
        {
          path: "/resourcesadd",
          name: "resourcesadd",
          component: ResourcesAdd,
        },
        {
          path: "/modules",
          name: "modules",
          component: Main,
        },
        {
          path: "/rafon",
          name: "secretRafonix",
          component: SecretService,
        },
      ],
    },
    { name: "login", path: "/login", component: Login },
    { name: "register", path: "/register", component: Register },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
