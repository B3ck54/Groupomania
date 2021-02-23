<template>
<div>
  <Header/>
  
  <Home/>
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
  color: #ff6702f8;
}
</style>