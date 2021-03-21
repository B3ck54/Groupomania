import Vue from 'vue'
import Vuex from 'vuex'
import postService from '../service/postService';
import userService from '../service/userService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      userId: "",
      email: "",
      token: null,
      isAdmin: false
    },
    errors: [],
    posts: [], //nos futurs posts
    message: "",
  },
  getters: {
  },
  mutations: {
    DELETE_TOKEN(state) {
      state.token = null;
      state.isLoggedIn = false;
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
    CREATE_POST(state, post) {
      state.posts = [post, ...state.posts];
      state.message = "message créé";
    },
    GET_ERROR(state, error) {
      state.errors = [error, ...state.errors];
    },
    GET_USER(state, [username, userId, email, isAdmin]) {
      state.user.username = username,
        state.user.userId = userId,
        state.user.email = email,
        state.user.token = localStorage.getItem('token'),
        state.user.isAdmin = isAdmin
    } 
  },
  actions: {
    //users
    deleteToken({ commit }, token) {
      commit("DELETE_TOKEN", token);
    },
    logOut({ commit }) {
      commit("LOG_OUT");
    },
    getPosts({ commit }) { // actions qui est chargé d'utiliser le postService - ({ commit }) = objet context
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
    createPost({ commit }, post) {
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
    getUser({ commit }) {
      userService.getUser().then((res) => {
          commit('GET_USER',[res.data.username, res.data.id, res.data.email, res.data.isAdmin])
        })
        .catch(err => {
          const error = {
            date: new Date(),
            message: `failed to retrieve get user: ${err.message}`
          };
          commit("GET_ERROR", error);
        });
    }
    
  },
  modules: {
  }
})