import Vue from 'vue'
import Vuex from 'vuex'
import postService from '../mixins/postService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    errors: [],
    posts: [], //nos futurs posts
    token: null,
    message: "",
  },
  getters: {
    isLogged(state) {
      return state.isLoggedIn;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
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
    }  
  },
  actions: {
    //users
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
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
      });
    }
  },
  modules: {
  }
})