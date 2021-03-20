<template>
  <v-toolbar elevation color="primary">
    <v-toolbar-title align="center" >
      <a href="/" class="d-flex align-center" style="text-decoration: 'none'">
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
      <v-btn v-if="isLogged === false" color="white" text class="mr-5">
        <span>Connexion</span>
        <v-icon>login</v-icon>
      </v-btn>
    </router-link>

     <router-link to="/profile" >
      <v-btn v-if="isLogged === false" color="white" text class="mr-5" >
        <span>Mon Profil</span>
        <v-icon>person</v-icon>
      </v-btn>
    </router-link>

      <router-link to="/chat" >
      <v-btn v-if="isLogged === false" color="white" text class="mr-5" >
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>
    </router-link>

      <v-btn v-if="isLogged === false" color="white" text @click="logout()" >
        <span>Déconnexion</span>
        <v-icon>logout</v-icon>
      </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      goDark: false
    }
  },
   computed: {
    isLogged() {
      return this.$store.getters.isLogged
    }
   },
  methods: {
    logout() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>

 
<style>
  a{
      text-decoration: none;
  }
</style>