import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import router from "./router"
import store from './store';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Toast);
Vue.prototype.$api = 'http://kahlpn.pl:3000';
// Vue.prototype.$api = 'http://localhost:3000';
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
