<template>
    <v-toolbar>
    <v-toolbar-title align="center">
      <a
      href="/"
      class="d-flex align-center"
      style="textDecoration: 'none'"
      >
        <img
        src="../../assets/logo-groupomania.png"
        alt="Groupomania"
        contain
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

      <router-link
        to="/add"
      >
        <v-btn
          color="white"
          text
        >
          <span>Add</span>
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>

      <router-link
        to="/search"
      >
        <v-btn
          color="white"
          text
        >
          <span>Search</span>
          <v-icon>search</v-icon>
        </v-btn>
      </router-link>


  </v-toolbar>
</template>

<script>
export default {
  name: 'Header'
};
</script>

 
<style lang="scss">
</style>