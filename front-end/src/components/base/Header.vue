<template>
    <v-toolbar>
    <v-toolbar-title align="center">
      <a
      href="/"
      class="d-flex align-center"
      style="text-decoration: 'none'"
      >
        <img
        src="../../assets/logo-groupomania.png"
        alt="Groupomania"
        contain
        height="50"
        >
      </a>
    </v-toolbar-title>

      <v-spacer/>

      <router-link
        to="/login"
        
      >
        <v-btn
          color="white"
          text
        >
          <span>Connexion</span>
          <v-icon>person</v-icon>
        </v-btn>
      </router-link>


        <v-btn
          color="white"
          text
          @click="disconnect()"
        >
          <span>Déconnexion</span>
          <v-icon>person</v-icon>
        </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Header',
  computed: {
  ...mapState(["user"])
  },
  methods: {
    disconnect() {
      localStorage.clear();
      location.replace(location.origin);
    }
  }
};

</script>

 
<style lang="scss">
</style>