import Vue from "vue";
import Router from "vue-router";
import Login from "./components/user/Login.vue";
import SignUp from "./components/user/SignUp.vue";


 
Vue.use(Router);
 
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "sign-up",
      component: SignUp
    }
  ]
});