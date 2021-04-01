<template>
  <v-container fluid class="pa-0">
    <v-row justify="center">
      <v-col cols="12">
        <v-avatar size="200px" color="grey lighten-4">
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
              @click="edit = user.id"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
          <span>Modifier</span>
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
      <v-col cols="8">
        <h3 class="mt-5">{{ user.username }}</h3>
        <h3 class="mt-5">{{ user.email }}</h3>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-form v-if="edit">
          <v-text-field
            v-model="user.username"
            filled
            color="deep-purple"
            label="Votre prénom"
            type="username"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            :rules="[rules.email]"
            filled
            color="deep-purple"
            label="Votre email"
            type="email"
          ></v-text-field>
          <v-btn @click="updateUser(user)">Sauvegarder</v-btn>

          <v-btn color="white" @click="edit = !edit" text> Annuler </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      edit: false,
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        length: (len) => (v) =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        required: (v) => !!v || "Le champs est requis",
      },
    };
  },
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
    updateUser(user) {
      axios
        .put(
          "http://localhost:3000/api/auth/user/" + user.id,
          {
            email: user.email,
            username: user.username,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      window.location.reload();
    },

    deleteUser(user) {
      axios
        .delete("http://localhost:3000/api/auth/user/" + user.id, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>