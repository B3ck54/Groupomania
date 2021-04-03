<template>
<v-container fluid>
  <v-row>
    <v-col>
      <img src="../../assets/icon-above-font.svg" alt="logo-groupomania" width="20%" />
    </v-col>
  </v-row>
  <v-row id="login">
    <v-spacer />
    <v-col cols="6">
      <v-form ref="form" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="dataLogin.email"
          :rules="[rules.email]"
          filled
          color="primary"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="dataLogin.password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="primary"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
          required
        ></v-text-field>
        <p class="mt-n2 text-error">{{ errorMessage }}</p>
      </v-form>
      <v-btn @click="login">Connexion</v-btn>
      <v-col>
        <router-link to="/register">
          <v-btn text>
            <span>Pas encore inscrit ?</span>
          </v-btn>
        </router-link>
      </v-col>
    </v-col>
    <v-spacer />
  </v-row>
</v-container>
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
    loading: false,
    errorMessage: "",
    token: null,
    form: false,
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
  beforeUpdate(){
    this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("dark"));
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/login", this.dataLogin)
        .then((res) => {
          this.loading = true;
          let token = res.data.token;
          if (!token) {
            this.errorMessage = "Cet email n/'existe pas";
          } else {
            localStorage.setItem("token", token);
            router.push({ name: "posts" });
            window.location.reload();
          }
        })
        .catch(() => {
          this.loading = false;
          this.errorMessage = "Adresse email ou mot de passe incorrect";
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