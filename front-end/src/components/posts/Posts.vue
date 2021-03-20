<template>
  <v-container>
    <h1 color="primary"
        >Bienvenue sur le Forum ! </h1>

        <h2 v-if="!posts.length" color="primary">Écrivez le premier post !!!</h2>

    <PostList/>


    <v-footer fixed>
      <v-container>
              <v-row justify="center">
        <v-col cols="10">
      <CreatePost/>
        </v-col>
              </v-row>
      </v-container>
    </v-footer>
  </v-container>

</template>
<script>

import CreatePost from '../posts/CreatePost';
import PostList from '../posts/PostList';
export default {
  components: {
    CreatePost,
    PostList
  },
  data: function () {
    return {
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

     
