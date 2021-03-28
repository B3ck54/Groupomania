<template>
  <v-toolbar elevation color="primary">
    <v-toolbar-title align="center">
      <a
        :href="redirect"
        class="d-flex align-center"
        style="text-decoration: 'none'"
      >
        <img
          src="../../assets/icon-left-font-monochrome-white.png"
          alt="Groupomania"
          contain
          height="250px"
        />
      </a>
    </v-toolbar-title>

    <v-spacer />

    <!-- <router-link to="/login">
      <v-btn color="white" text class="mr-5" v-if="user.token == null">
        <span>Connexion</span>
        <v-icon>login</v-icon>
      </v-btn>
    </router-link> -->

    <router-link to="/register">
      <v-btn color="white" text class="mr-5" v-if="loggedIn == false">
        <span>Inscription</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/profile">
      <v-btn color="white" text class="mr-5" v-if="loggedIn == true">
        <span>Mon Profil</span>
        <v-icon>person</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/chat">
      <v-btn color="white" text class="mr-5" v-if="loggedIn == true">
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/admin">
      <v-btn
        color="white"
        text
        class="mr-5"
        v-if="loggedIn == true && user.isAdmin == true"
      >
        <span>Admin</span>
        <v-icon>security</v-icon>
      </v-btn>
    </router-link>

    <v-btn color="white" text @click="logout()" v-if="loggedIn == true">
      <span>Déconnexion</span>
      <v-icon>logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      redirectLogin: "/",
      redirectPosts: "/chat",
    };
  },
  computed: {
    ...mapState(["user"]),
    redirect() {
      if (this.loggedIn == false) {
        return this.redirectLogin;
      } else {
        return this.redirectPosts;
      }
    },
    loggedIn() {
      return this.$store.getters.token;
    },

  },
  methods: {
    logout() {
      this.$store.dispatch("logOut");
    }
  },
};
</script>

 
<style>
a {
  text-decoration: none;
}
</style>