<template>
  <v-row id="login">
    <v-spacer />
    <v-col cols="6">
      <v-form ref="form" v-model="form">
        <v-text-field
          v-model="dataLogin.email"
          :rules="[rules.email]"
          filled
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="dataLogin.password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
      </v-form>
      <v-btn @click="login">Connexion</v-btn>
      <p class="my-3 text-danger">{{ errorMessage }}</p>
      <v-col>
        <router-link to="/register">
          <v-btn color="white" text>
            <span>Pas encore inscrit ?</span>
          </v-btn>
        </router-link>
      </v-col>
    </v-col>
    <v-spacer />
  </v-row>
</template>


<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "login",
  data: () => ({
    agreement: false,
    dataLogin: {
      email: null,
      password: null,
    },
    errorMessage: "",
    token: null,
    form: false,
    isLoading: false,
    rules: {
      email: (v) =>
        !!(v || "").match(/@/) || "Merci de rentrer un email valide",
      length: (len) => (v) =>
        (v || "").length >= len ||
        `La longuer n'est pas valide, il faut ${len} maximum`,
      password: (v) =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Le mot de passe doit contenir une lettre majuscule, un caractère numérique, et un caractère spécial",
      required: (v) => !!v || "Le champ est requis",
    },
  }),
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/login", this.dataLogin)
        .then((res) => {
          let token = res.data.token;
          if (!token) {
            this.errorMessage = "Cet email n/'existe pas";
          } else {
            localStorage.setItem("token", token);
            router.push({ name: "posts" });
          }
        })
        .catch((e) => {
          console.log(e);
        });

      this.submitted = true;
    },
  },
};
</script>

<style lang="scss">
#login {
  margin-top: 40px;
}
</style>