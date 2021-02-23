<template>
<v-container fluid>
    <v-row align="center">
      <v-col cols="12">
        <h1>GROUPOMANIA</h1>
        <h3>Social Network</h3>
      </v-col>
      <br/>
    <router-view/>
    </v-row>
</v-container>
</template>
 
<script>
export default {
  name: 'home',
};
</script>
 
<style lang="scss">
</style>