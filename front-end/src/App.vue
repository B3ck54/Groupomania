<template>
<div id="app">
  <Header/>
  
  <div id="home">
  <Home/>
  </div>
</div>
</template>
 
<script>
import Header from "./components/base/Header.vue";
import Home from "./components/base/Home.vue";

export default {
  name: 'app',
  components: {
    Header,
    Home
  },

};
</script>
 
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  color: #ff6702f8;
}
#home {
  margin-top: 60px;
}
</style>