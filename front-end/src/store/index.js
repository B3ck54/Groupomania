import Vue from 'vue'
import Vuex from 'vuex'
import postService from '../service/postService';
import userService from '../service/userService';

import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      userId: "",
      email: "",
      isAdmin: false
    },
    token: localStorage.getItem("token") || null,
    users: [],
    errors: [],
    posts: [], //nos futurs posts
    post: {},
    message: "",
    answers: [],
    imageUrl: ""
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    post(state) {
      return state.post;
    },
    answers(state) {
      return state.answers;
    },
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    message(state) {
      return state.error;
    },
    imageUrl(state) {
      return state.error;
    },
    token(state) {
      return state.token !== null;
    }
  },
  mutations: {
    GET_TOKEN(state, token) {
      state.token = token;
    },
    DELETE_TOKEN(state) {
      state.token = null;
    },
    LOG_OUT(state) {
      localStorage.removeItem('token');
      location.replace(location.origin);
      state.token = null;
      state.error = "";
    },
    GET_POSTS(state, posts) { // mutation appelée par notre action une fois la réponse du postService obtenu, elle a disposition le state, et un payload
      state.posts = posts; // on vuet modifier le morceau d'état qui s'appelle posts et on change sa valeur qui ont été récupéré grâce au service getPOsts avec le res.data qu'on a passé à notre
    },
    GET_POST(state, post) {
      state.post = post;
    },
    CREATE_POST(state, post) {
      state.posts = [post, ...state.posts];
    },
    ADD_ANSWER(state, answer) {
      state.posts = [answer, ...state.posts];
    },
    GET_ERROR(state, error) {
      state.errors = [error, ...state.errors];
    },
    GET_USER(state, user) {
      state.user = user;
    },
    GET_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    //token
    getToken({
      commit
    }, token) {
      commit("GET_TOKEN", token);
    },
    //users
    deleteToken({
      commit
    }, token) {
      commit("DELETE_TOKEN", token);
    },
    logOut({
      commit
    }) {
      commit("LOG_OUT");
    },
    getPosts({
      commit
    }) { // actions qui est chargé d'utiliser le postService - ({ commit }) = objet context
      postService
        .getPosts() // méthode qui nous permet de faire une requête -> retourne une axios promesse
        .then(res => {
          commit("GET_POSTS", res.data); // nous allons commiter la réponse (res.data) à la l'aide de la mutation GET_POSTS
        })
        .catch(err => {
          const error = {
            date: new Date(),
            message: `failed to retrieve posts: ${err.message}`
          };
          commit("GET_ERROR", error);
        });
    },
    getPost({
      commit
    }, id) {
      postService.getPost(id).then((res) => {
        const post = res.data;
        commit("GET_POST", post);
      });
    },
    createPost({
      commit
    }, post) {
      postService.createPost(post).then((res) => {
          const post = res.data;
          commit("CREATE_POST", post)
        })
        .catch(err => {
          const error = {
            date: new Date(),
            message: `failed to create a post: ${err.message}`
          };
          commit("GET_ERROR", error);
        });
    },
    addAnswer({
      commit
    }, post) {
      axios
        .post(
          `http://localhost:3000/api/posts/${post.id}/answers`,
          post.data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then((response) => {
          const answer = response.data;
          commit("ADD_ANSWER", answer);
        })
        .then(() => {
          postService.getPosts().then((response) => {
            const posts = response.data;
            commit("GET_POSTS", posts);
          });
        })
        .catch(err => {
          const error = {
            date: new Date(),
            message: `failed to create answers: ${err.message}`
          };
          commit("GET_ERROR", error);
        });
    },
    getUser({
      commit
    }) {
      userService.getUser().then((res) => {
          const user = res.data;
          commit('GET_USER', user)
        })
        .catch(err => {
          const error = {
            date: new Date(),
            message: `failed to retrieve get user: ${err.message}`
          };
          commit("GET_ERROR", error);
        });
    },
    getUsers({
      commit
    }) {
      userService.getUsers()
        .then(res => {
          commit("GET_USERS", res.data);
        })
        .catch(err => {
          const error = {
            date: new Date(),
            message: `failed to retrieve users: ${err.message}`
          };
          commit("GET_ERROR", error);
        });
    }
  },
  modules: {}
})