<template>
  <v-container fluid class="pa-0">
    <v-row justify="center">
      <v-col cols="8">
        <v-avatar size="200" color="grey lighten-4">
          <img src="../../assets/avatar.png" alt="avatar" />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="secondary"
              class="ma-2 white--text"
              small
              depressed
              fab
              v-bind="attrs"
              v-on="on"
              @click="getUser(user.id)"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
          <span>Éditer</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="error"
              class="ma-2 white--text"
              small
              depressed
              fab
              v-bind="attrs"
              v-on="on"
              href="javascript:;"
              @click="deleteUser(user)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>Supprimer</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <h3 class="mt-5">{{ user.username }}</h3>
        <h3 class="mt-5">{{ user.email }}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  mounted() {
    this.$store.dispatch("getUser");
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getUser(id) {
      this.$router.push(`user/${id}`);
    },
    deleteUser(user) {
      if(confirm("Voulez vous vraiment supprimer ce compte")) {
        axios
          .delete("http://localhost:3000/api/auth/user/" + user.id, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        this.$store.dispatch("logOut");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>