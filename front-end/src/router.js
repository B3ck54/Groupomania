import Vue from "vue";
import Router from "vue-router";
import Login from "./components/user/Login.vue";
import SignUp from "./components/user/SignUp.vue";
import Profile from "./components/user/UpdateProfile.vue";
import Posts from "./components/posts/Posts.vue";
import Users from "./components/admin/Users.vue";

import axios from "axios";


Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [{
      path: '/',
      redirect: {
        name: 'login'
      },
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "sign-up",
      component: SignUp
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token');
        if (!token) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: "/chat",
      name: "posts",
      component: Posts,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token');
        if (!token) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: "/admin",
      name: "users",
      component: Users,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token');

        if (!token) {
          next('/');
        } else {
          axios.get('http://localhost:3000/api/auth/me', {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }).then(res => {
            let isAdmin = res.data.isAdmin;
            if (isAdmin == true) {
              next()
            } else {
              next({
                name: 'posts'
              })
            }
          })
        }

      }
    },

  ]
});