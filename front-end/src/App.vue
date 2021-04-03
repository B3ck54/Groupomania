<template>
  <div id="app">
    <v-app>
      <div height="80px">
        <Header />
      </div>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        label="Theme Dark"
        persistent-hint
        class="ml-10"
      ></v-switch>

      <router-view />
    </v-app>
  </div>
</template>
 
<script>
import Header from "./components/base/Header.vue";


export default {
  name: "app",
  components: {
    Header
  }
};
</script>
 
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
}
#home {
  margin-top: 60px;
}
</style>