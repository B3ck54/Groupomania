<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="12" xs="12" v-if="user.isAdmin == true">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="text-left">
                <th>id</th>
                <th>Pseudo</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody v-if="$store.state.users">
              <tr v-for="user in users" :key="user.id" class="text-left">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <v-btn
                    v-if="user.isAdmin == false"
                    color="error"
                    class="ma-2 white--text"
                    depressed
                    small
                    fab
                    @click="deleteUser(user)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
    mounted() {
    this.$store.dispatch("getUser");
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    users() {
      return this.$store.getters.users;
    },
    ...mapState(["user"]),
  },
  created() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    deleteUser(user) {
      axios
        .delete("http://localhost:3000/api/auth/user/" + user.id, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped></style>