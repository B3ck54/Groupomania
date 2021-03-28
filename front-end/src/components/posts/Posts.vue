<template>
  <v-container>
    <!-- Create post -->
    <v-row justify="center">
      <v-col cols="12">
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
      <v-col cols="12">
        <v-card
          v-for="post in posts"
          :key="post.id"
          class="mb-8"
          color="primary"
        >
          <v-row align="center">
            <v-col cols="4">
              <v-row>
                <v-col cols="4">
                  <v-avatar size="30" color="grey lighten-4">
                    <img
                      src="data:image/png;base64,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"
                      alt="avatar"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="4" align="left" class="ml-n8">
                  <h5>{{ post.User.username }}</h5>
                  <p class="caption">
                    {{ post.createdAt | moment }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <span color="primary">{{ post.message }}</span>
            </v-col>
            <v-col
              cols="4"
              v-if="
                user.isAdmin === true || $store.state.user.id == post.User.id
              "
            >
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
                    @click="getPost(post.id)"
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
                    @click="deletePost(post)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>Supprimer</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <!-- PostList -->
          <!-- answers -->
          <v-card-actions >
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
            <v-btn @click="show = !show" color="white" text small>
              Voir les commentaires</v-btn
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
                  <v-col cols="7" class="ml-8" align="left">
                    <p class="caption">
                      {{ answer.User.username }} a commenté ce post
                      {{ answer.createdAt | moment }}
                    </p>
                    <p>{{ answer.comment }}</p>
                  </v-col>
                  <v-col cols="2">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="secondary"
                          class="ma-2 white--text"
                          x-small
                          depressed
                          fab
                          v-bind="attrs"
                          v-on="on"
                          @click="getAnswer(answer.id)"
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
                  <v-form
                    v-model="valid"
                  >
                    <v-text-field
                      label="Votre commentaire"
                      v-model="data.comment"
                      lazy-validation

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
        commentUsername: this.$store.state.user.username,
      },
      valid: false,
    };
  },
  beforeUpdate() {
    this.$store.state.user;
  },
  created() {
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
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      window.location.reload();
    },
     getPost(id) {
      this.$router.push(`posts/${id}`);
    },
    onSubmitAnswer(id) {
      // this.$store.dispatch("getPosts");
      this.$store.dispatch("addAnswer", {
        id: id,
        data: this.data,
      });
      this.data.comment = "";
      // this.$store.dispatch("getPost", this.post.id);
    },
    deleteAnswer(answer) {
      http
        .delete("http://localhost:3000/api/posts/answers/" + answer.id, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
        window.location.reload();

    },
  },
};
</script>

<style lang="scss" scoped>
</style>
     
