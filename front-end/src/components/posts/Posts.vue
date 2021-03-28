<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <h1 class="mt-n4" color="primary">Bienvenue sur le Forum !</h1>
        <h2 v-if="!posts.length" color="primary">
          Écrivez le premier post !!!
        </h2>
        <CreatePost />
        <PostList/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CreatePost from "../posts/CreatePost";
import PostList from "../posts/PostList";
export default {
  components: {
    CreatePost,
    PostList,
  },
  data: function () {
    return {};
  },
  created() {
    this.$store.dispatch("getPosts"); //dès que le component est créé il va  dispatché l'actions qui permet de récupérer nos posts - il va lancer la requête vers notre api
    // this.$store.dispatch("getUser");
  },
  computed: {
    posts() {
      return this.$store.state.posts;
      //cette computed va écouter le store
    },
  },
  
};
</script>

     
