import Vue from "vue";
import App from "./App.vue";
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import store from './store';

import '@babel/polyfill';

Vue.config.productionTip = false;

new Vue({
  // inject the router to make whole app router-aware
  router,
  vuetify,
  Vuex,
  store,
  render: h => h(App)
}).$mount("#app");