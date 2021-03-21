<template>
  <v-toolbar elevation color="primary">
    <v-toolbar-title align="center">
      <a href="/home" class="d-flex align-center" style="text-decoration: 'none'">
        <img
          src="../../assets/icon-left-font-monochrome-white.png"
          alt="Groupomania"
          contain
          height="250px"
        />
      </a>
    </v-toolbar-title>

    <v-spacer />

    <router-link to="/login">
      <v-btn color="white" text class="mr-5" v-if="user.token == null">
        <span>Connexion</span>
        <v-icon>login</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/profile">
      <v-btn color="white" text class="mr-5" v-if="user.token !== null">
        <span>Mon Profil</span>
        <v-icon>person</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/chat">
      <v-btn color="white" text class="mr-5" v-if="user.token !== null">
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>
    </router-link>

    <v-btn color="white" text @click="logout()" v-if="user.token !== null">
      <span>Déconnexion</span>
      <v-icon>logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

 
<style>
a {
  text-decoration: none;
}
</style>