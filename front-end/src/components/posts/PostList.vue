<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="6">
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
            <v-col cols="4" v-if="user.isAdmin === true">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="secondary"
                    class="ma-2 white--text"
                    small
                    depressed
                    fab
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </template>
                <span>Éditer</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="error"
                    class="ma-2 white--text"
                    small
                    depressed
                    fab
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>Supprimer</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <!-- <Comments />  v-for comment in comments ...-->
          <v-card class="pa-2">
            <!-- <v-row align="center">
              <v-col cols="4" align="left" class="ml-3">
                <Profile />
              </v-col>
              <v-col cols="7" align="left">
                <span>Bravo c'est super !!!</span>
              </v-col>
            </v-row> -->
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Profile from "../user/Profile";
import { mapState } from "vuex";

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
    ...mapState(["user"])
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>