<template>
  <v-container>
    <v-row justify="center" >
      <v-col cols="12" >
        <h1>GROUPOMANIA</h1>
        <h3>Social Network</h3>
      </v-col>
            <router-view/>
    </v-row>
  </v-container>
</template>
 
<script>
export default {
  name: "home",

    methods: {
    logOut: function() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>
 
<style lang="scss">
</style>