<template>
  <v-container class="fill-height">
    <v-row align="center">
      <v-col cols="6" md="12">
        <v-card
          v-for="post in posts"
          :key="post.id"
          class="mb-8"
          color="primary"
        >
          <v-row align="center">
            <v-col cols="4">
              <Profile />
            </v-col>
            <v-col cols="4">
              <span color="primary">{{ post.message }}</span>
            </v-col>
          </v-row>
          <!-- <Comments />  v-for comment in comments ...-->
          <v-card class="pa-2">
            <v-row align="center">
              <v-col cols="4" align="left" class="ml-3">
                <Profile />
              </v-col>
              <v-col cols="7" align="left">
                <span>Bravo c'est super !!!</span>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Profile from "../user/Profile";

export default {
  components: {
    Profile,
  },
  created() {
    this.$store.dispatch("getPosts"); //dès que le component est créé il va  dispatché l'actions qui permet de récupérer nos posts - il va lancer la requête vers notre api
  },
  computed: {
    posts() {
      return this.$store.state.posts; //cette computed va écouter le store
    },
  },
};
</script>

<style lang="scss" scoped>
</style>