<template>
  <v-container>
    <v-toolbar-title class="white--text"
        >Bienvenue sur le Forum ! </v-toolbar-title>
    <v-container class="fill-height">
      <v-row class="fill-height pb-14" align="end">
        <v-col>
          <div v-for="post in posts" :key="post.id"
              :class="['d-flex flex-row align-center my-2 justify-end']">
            <span class="blue--text mr-3">{{ post.message }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-container class="ma-0 pa-0">
      <CreatePost/>
      </v-container>
    </v-footer>
  </v-container>

</template>
<script>

import CreatePost from '../posts/CreatePost';
export default {
  components: {
    CreatePost,
  },
  data: function () {
    return {
      msg: null,
    };
  },
  created() {
      this.$store.dispatch("getPosts"); //dès que le component est créé il va  dispatché l'actions qui permet de récupérer nos posts - il va lancer la requête vers notre api
  },
  computed: {
    posts() {
      return this.$store.state.posts; //cette computed va écouter le store
    },
  },
  methods: {
  },
};
</script>

     
