import Vue from "vue";
import Router from "vue-router";
import Login from "./components/user/Login.vue";
import SignUp from "./components/user/SignUp.vue";
import Profile from "./components/user/UpdateProfile.vue";
import Posts from "./components/posts/Posts.vue";
import Home from "./components/base/Home.vue";


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
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "sign-up",
      component: SignUp
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/chat",
      name: "posts",
      component: Posts
    }
  ]
});