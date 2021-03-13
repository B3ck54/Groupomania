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
      <v-btn @click="login">Submit</v-btn>
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
import router from '../../router'

export default {
  name: "login",
  data: () => ({
    agreement: false,
    dataLogin: {
      email: null,
      password: null
    },
    form: false,
    isLoading: false,
    password: "",
    rules: {
      email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
      length: (len) => (v) =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      password: (v) =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      required: (v) => !!v || "This field is required",
    },
  }),
  methods: {
    login() {
      // var data = {
      //   email: this.email,
      //   password: this.password,
      // };
      axios
        .post("http://localhost:3000/api/auth/login", this.dataLogin)
        .then((response) => {
          // this.user.id = response.data.id;
          console.log(response.data);
          localStorage.setItem('token', response.data.token)
          router.push({ name: 'chat' })
        })
        .catch((e) => {
          console.log(e);
        });

      this.submitted = true;
    }
  }
};
</script>

<style lang="scss">
#login {
  margin-top: 40px;
}
</style>