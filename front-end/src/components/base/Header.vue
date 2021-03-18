<template>
  <v-toolbar>
    <v-toolbar-title align="center">
      <a href="/" class="d-flex align-center" style="text-decoration: 'none'">
        <img
          src="../../assets/logo-groupomania.png"
          alt="Groupomania"
          contain
          height="50"
        />
      </a>
    </v-toolbar-title>

    <v-spacer />

    <router-link to="/login">
      <v-btn v-if="isLogged === false" color="white" text>
        <span>Connexion</span>
        <v-icon>person</v-icon>
      </v-btn>
    </router-link>

      <v-btn v-if="isLogged === false" color="white" @click="logout()" text>
        <span>Déconnexion</span>
        <v-icon>person</v-icon>
      </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Header",
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

 
<style lang="scss">
</style>