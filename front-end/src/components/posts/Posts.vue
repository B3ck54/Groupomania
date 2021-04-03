<template>
  <v-container>
     <v-row>
    <v-col>
      <img class="mt-n4" src="../../assets/icon.svg" alt="logo-groupomania" width="10%" />
    </v-col>
  </v-row>
    <!-- Create post -->
    <v-row justify="center">
      <v-col cols="10" sm="6">
        <h1 class="mt-n4" color="primary">Bienvenue sur le Forum !</h1>
        <h2 v-if="!posts.length" color="primary">
          Écrivez le premier post !!!
        </h2>
        <CreatePost />
      </v-col>
    </v-row>
    <!-- Create post -->

    <!-- PostList -->
    <v-row justify="center">
      <v-col cols="10" sm="6">
        <v-card
          v-for="post in posts"
          :key="post.id"
          class="mb-8"
          outlined
          rounded
        >
          <v-row>
            <v-col cols="12">
              <v-row class="mt-2 ml-4">
                <v-col cols="2" lg="1" md="2" sm="2" xs="2" align="left">
                  <v-avatar size="40" color="grey lighten-4">
                    <img src="../../assets/avatar.png" alt="avatar" />
                  </v-avatar>
                </v-col>
                <v-col cols="4" align="left">
                  <h5>{{ post.User.username }}</h5>
                  <p class="caption">
                    {{ post.createdAt | moment }}
                  </p>
                </v-col>
                <v-col
                  class="text-right mr-10"
                  v-if="
                    user.isAdmin === true ||
                    $store.state.user.id == post.User.id
                  "
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="error"
                        class="ma-2 white--text"
                        x-small
                        depressed
                        fab
                        v-bind="attrs"
                        v-on="on"
                        @click="deletePost(post)"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Supprimer</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer />
            <v-col cols="11" class="text-left ml-12">
              <p>{{ post.message }}</p>
            </v-col>

            <v-col v-if="post.imageUrl">
              <v-img :src="post.imageUrl"> </v-img
            ></v-col>
          </v-row>
          <!-- PostList -->

          <!-- answers -->
          <v-card-actions>
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
             <v-btn @click="show = !show" v-if="post.Answers.length == 0" text small>
             Commenter</v-btn
            >
            <v-btn  v-else @click="show = !show" text small>
              {{ post.Answers.length}} commentaire(s)</v-btn
            >
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider />
              <v-card
                class="pa-2"
                v-for="answer in post.Answers"
                :key="answer.id"
              >
                <v-row>
                  <v-col cols="1" align="center" class="pr-10">
                    <v-avatar size="30" color="grey lighten-4">
                      <img src="../../assets/avatar.png" alt="avatar" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="7" align="left">
                    <p class="caption">
                      {{ answer.User.username }} a commenté ce post
                      {{ answer.createdAt | moment }}
                    </p>
                    <p class="caption">{{ answer.comment }}</p>
                  </v-col>
                  <v-col
                    cols="2"
                    v-if="
                      user.isAdmin === true ||
                      $store.state.user.id == answer.UserId
                    "
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="error"
                          class="ma-2 white--text"
                          x-small
                          depressed
                          fab
                          v-bind="attrs"
                          v-on="on"
                          @click="deleteAnswer(answer)"
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Supprimer</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <v-divider />
              </v-card>
              <v-row class="pa-3">
                <v-col>
                  <v-form v-model="valid">
                    <v-text-field
                      label="Votre commentaire"
                      filled
                      rounded
                      dense
                      v-model="data.comment"
                      auto-grow
                    >
                    </v-text-field>
                    <v-btn
                      @click="onSubmitAnswer(post.id)"
                      :disabled="!valid"
                      small

                      >Poster</v-btn
                    >
                  </v-form>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>
          <!-- answers -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Profile from "../user/Profile";
import { mapState } from "vuex";
import moment from "moment";
import CreatePost from "../posts/CreatePost";
import http from "../../http-commons";

export default {
  components: {
    CreatePost,
  },
  data() {
    return {
      show: false,
      form: false,
      data: {
        comment: "",
        username: this.$store.state.user.username,
      },
      valid: false,
    };
  },

  created() {
    this.$store.state.user.username;
    this.$store.dispatch("getPosts"); //dès que le component est créé il va  dispatché l'actions qui permet de récupérer nos posts - il va lancer la requête vers notre api
  },
  filters: {
    moment: function (date) {
      // return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      return moment(date).locale("fr").startOf("minutes").fromNow();
    },
  },
  computed: {
    posts() {
      return this.$store.state.posts; //cette computed va écouter le store
    },
    ...mapState(["user"]),
  },
  methods: {
    deletePost(post) {
      http
        .delete("http://localhost:3000/api/posts/" + post.id, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.reload();
    },
    onSubmitAnswer(id) {
      this.$store.dispatch("getPosts");
      this.$store.dispatch("addAnswer", {
        id: id,
        data: this.data,
      });
      window.location.reload();

    },
    deleteAnswer(answer) {
      http
        .delete("http://localhost:3000/api/posts/answers/" + answer.id, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
     
