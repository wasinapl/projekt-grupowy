import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { name: "login", path: "/login", component: () => import(/* webpackChunkName: "Auth-Login" */ './views/auth/Login.vue'), },
    { name: "register", path: "/register", component:() => import(/* webpackChunkName: "Auth-Register" */ './views/auth/Register.vue'), },
    {
      name: "home",
      path: "",
      component:() => import(/* webpackChunkName: "App-Home" */ './views/app/Home.vue') ,
      children: [
        {
          path: "/energyResources",
          name: "energyRes",
          component:() => import(/* webpackChunkName: "KnowledgeBase-EnergyResources" */ './views/app/knowledgeBase/EnergyCarry.vue'),
        },
        {
          path: "/units",
          name: "units",
          component:() => import(/* webpackChunkName: "KnowledgeBase-Units" */ './views/app/knowledgeBase/Units.vue'),
        },
        {
          path: "/category",
          name: "category",
          component:() => import(/* webpackChunkName: "KnowledgeBase-Categories" */ './views/app/knowledgeBase/Categories.vue'),
        },
        {
          path: "/resources",
          name: "resources",
          component:() => import(/* webpackChunkName: "KnowledgeBase-Resources" */ './views/app/knowledgeBase/Resources.vue'),
        },
        {
          path: "/resourcesadd",
          name: "resourcesadd",
          component: () => import(/* webpackChunkName: "KnowledgeBase-ResourceAdd" */ './views/app/knowledgeBase/ResourceAdd.vue'),
        },
        {
          path: "/sources",
          name: "sources",
          component: () => import(/* webpackChunkName: "KnowledgeBase-Sources" */ './views/app/knowledgeBase/Sources.vue'),
        },
        {
          path: "/modules",
          name: "modules",
          component: () => import(/* webpackChunkName: "Modules" */ './views/app/Modules.vue'),
        },
        {
          path: "/stages",
          name: "stages",
          component: () => import(/* webpackChunkName: "Stages" */ './views/app/Stages.vue'),
        },
        {
          path: "/lines",
          name: "lines",
          component: () => import(/* webpackChunkName: "Lines" */ './views/app/Lines.vue'),
        },
        {
          path: "/calculator",
          name: "calculator",
          component: () => import(/* webpackChunkName: "Calc" */ './views/app/Calc.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
