<template>
  <v-row>
    <v-col cols="6">
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          filled
          color="deep-purple"
          label="Email address"
          type="email"
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
            <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
            &nbsp;and&nbsp;
            <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
          </template>
        </v-checkbox>
        <v-btn  @click="saveUser">Submit</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios';

export default {
  name: "sign-up",
  data: () => ({
    agreement: false,
    dialog: false,
    email: null,
    form: false,
    isLoading: false,
    password: null,
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
      var data = {
        email: this.email,
        password: this.password
      };
 
      axios
        .post("http://localhost:3000/api/auth/register", data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
 
      this.submitted = true;
    }
   }
};
</script>

<style lang="scss">
</style>