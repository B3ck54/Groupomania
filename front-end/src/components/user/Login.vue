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
      </v-form>
      <v-col>
        <router-link to="/register">
          <v-btn color="white" text>
            <span>Pas encore inscrit ?</span>
          </v-btn>
        </router-link>
      </v-col>
    </v-col>
  </v-row>
</template>


<script>
export default {
  name: "login",
  data: () => ({
    agreement: false,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
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
};
</script>

<style lang="scss">
</style>