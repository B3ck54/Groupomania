<template>
  <v-container>
    <v-row justify="center">
    <v-col >
        <v-form ref="form" v-model="form" class="pt-6">
          <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            color="deep-purple"
            label="Email address"
            type="email"
          ></v-text-field>
           <v-text-field
            v-model="username"
            filled
            color="deep-purple"
            label="Username"
            type="username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.password, rules.length(6)]"
            filled
            color="deep-purple"
            counter="6"
            label="Password"
            style="min-height: 96px"
            type="password"
          ></v-text-field>
          <v-checkbox
            v-model="agreement"
            :rules="[rules.required]"
            color="deep-purple"
          >
            <template v-slot:label>
              I agree to the&nbsp;
              <a href="#" @click.stop.prevent="dialog = true"
                >Terms of Service</a
              >
              &nbsp;and&nbsp;
              <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a
              >*
            </template>
          </v-checkbox>
          <v-btn @click="saveUser">Submit</v-btn>
        </v-form>
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

          })
          .catch((err) => console.log(err));
      } else {
        alert("veuillez renseigner tout les schamps !");    
      }
    }
  }
};
</script>

<style lang="scss">
</style>