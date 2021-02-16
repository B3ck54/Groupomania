<template>
<div>
  <Header/>

    <v-row align="center">
      <v-col cols="12">
        <h1>GROUPOMANIA</h1>
        <h3>Social Network</h3>
      </v-col>
      <br/>
    <router-view/>
    </v-row>
</div>
</template>
 
<script>
import Header from "./components/base/Header.vue";
export default {
  name: 'app',
  components: {
    Header
  },

};
</script>
 
<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ff6702f8;
}
</style>