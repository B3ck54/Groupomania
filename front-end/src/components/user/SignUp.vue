<template>
  <v-container fluid>
  <v-row>
    <v-col>
      <img src="../../assets/icon-above-font.svg" alt="logo-groupomania" width="20%" />
    </v-col>
  </v-row>
    <v-row justify="center">
    <v-col cols="8" >
        <v-form ref="form" v-model="form" class="pt-6">
          <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            color="primary"
            label="Email"
            type="email"
          ></v-text-field>
           <v-text-field
            v-model="username"
            filled
            color="primary"
            label="Pseudo"
            type="username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.password, rules.length(6)]"
            filled
            color="primary"
            counter="6"
            label="Mot de passe"
            style="min-height: 96px"
            type="password"
          ></v-text-field>
          <v-btn @click="saveUser">S'inscrire</v-btn>
        </v-form>
        <v-col>
        <router-link to="/login">
          <v-btn color="white" text>
            <span>Vous avez déjà un compte ? Connectez vous ici !</span>
          </v-btn>
        </router-link>
      </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import router from '../../router'

export default {
  name: "sign-up",
  data: () => ({
    agreement: false,
    dialog: false,
    email: null,
    form: false,
    isLoading: false,
    password: null,
    username: null,
    rules: {
      email: (v) => !!(v || "").match(/@/) || "Cet email n'est pas valide",
      length: (len) => (v) =>
        (v || "").length >= len || `Caractère et longueur invalide, requis ${len}`,
      password: (v) =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Le mot de passe doit contenir une lettre majuscule, un chiffre, et un caractère spécial",
      required: (v) => !!v || "Ce champs est requis"
    },
  }),
  methods: {
    /* eslint-disable no-console */
    saveUser() {
      var dataLogin = {
        email: this.email,
        password: this.password,
        username: this.username
      };
      if (this.$refs.form.validate()) {
        axios.post("http://localhost:3000/api/auth/register", dataLogin)
          .then(res => {
              let token = res.data.token;
              localStorage.setItem("token", token); 
              router.push({ name: 'posts' }) ;
              window.location.reload();
          })
          .catch((err) => console.log(err));
      } else {
        alert("veuillez renseigner tout les champs ");    
      }
    }
  }
};
</script>

<style lang="scss">
</style>